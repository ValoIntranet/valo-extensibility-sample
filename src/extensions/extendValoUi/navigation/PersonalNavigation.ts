import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { ProviderService, IClientStorageProvider, MegaMenuItem, ExtensionService, IntranetProvider, StorageType, IntranetLocation } from "@valo/extensibility";
import { SPHttpClient } from "@microsoft/sp-http";


export class PersonalNavigation {

  /**
   * Retrieve a navigation file from another site and provide it to get rendered to the navigation
   *
   * IMPORTANT: Be sure to cache
   *
   * @param ctx
   */
  public static async create(ctx: ApplicationCustomizerContext, providerService: ProviderService, extensionService: ExtensionService) {
    const clientStorage = await providerService.getProvider<IClientStorageProvider>(IntranetProvider.ClientStorage);
    console.log(clientStorage);
    if (clientStorage && clientStorage.instance) {
      const csService = clientStorage.instance as IClientStorageProvider;
      const storageKey = "Client:Extensibility:Navigation";
      let navigationItems = csService.get<MegaMenuItem[]>(storageKey);
      if (!navigationItems) {
        navigationItems = await this.fetchNavigation(ctx);
        const crntDate = new Date(Date.now());
        crntDate.setMinutes(crntDate.getMinutes() + 30);
        // 30 minutes caching
        csService.put(storageKey, navigationItems, StorageType.localStorage, crntDate);
      }

      if (navigationItems) {
        extensionService.registerExtension({
          id: "MegaMenuAfterNavigationItems",
          location: IntranetLocation.MegaMenuAfterNavigationItems,
          element: navigationItems as MegaMenuItem[]
        });
      }
    }
  }

  /**
   * Fetch the navigation file
   */
  private static async fetchNavigation(ctx: ApplicationCustomizerContext) {
    try {
      const intranetUrl = "https://valointranetdev.sharepoint.com/sites/tea-point";
      const navUrl = new URL(intranetUrl);
      let pathName = navUrl.pathname;
      // Check if the pathName starts with a slash (issue on IE11)
      if (pathName.indexOf("/") > 0) {
        pathName = `/${pathName}`;
      }
      const navUrlApi = `${intranetUrl}/_api/web/GetFileByServerRelativeUrl('${pathName}/config/navigation1.json')/$value`;
      const data = await ctx.spHttpClient.get(navUrlApi, SPHttpClient.configurations.v1);
      // Check if footer html was retrieved
      if (data.ok) {
        const txtData = await data.text();
        if (txtData && typeof txtData === "string") {
          const navigation = JSON.parse(txtData);
          if (navigation && navigation.valoHubData && navigation.valoHubData.menubar) {
            return navigation.valoHubData.menubar;
          }
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
