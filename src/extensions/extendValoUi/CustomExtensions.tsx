import * as React from 'react';
import { IntranetLocation, IntranetTrigger, IntranetProvider, ExtensionService, TriggerService, ProviderService, ExtensionProvider, IUserProfileProvider, DataSourceService, ExtensionPointToolboxAction, ExtensionPointToolboxPanelCreationAction, MegaMenuItem, StorageType, IClientStorageProvider } from '@valo/extensibility';
import { IMultilingualProvider } from '@valo/extensibility/lib/providerTypes/IMultilingualProvider';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import Clock from './clock';
import { NoPagingDataSource } from './datasource/NoPagingDataSource';
import { DynamicPagingDataSource } from './datasource/DynamicPagingDataSource';
import { StaticDataSource } from './datasource/StaticDataSource';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { SPHttpClient } from "@microsoft/sp-http";


const renderLinkIcon = (props: any) => {
  return (props.properties && props.properties.iconName) ? (
    <Icon iconName={props.properties.iconName} />
  ) : (
    <Icon iconName="GenericScan" />
  );
};

export const CustomGroupHeader: React.SFC<any> = (props: any) => {
  if (props.link) {
    return (
      <a href={props.link} title={props.title} style={{
        backgroundColor: "#efefef",
        color: "pink",
        fontWeight: 600,
        textTransform: "capitalize"
      }}>{props.title}</a>
    );
  } else {
    return (
      <span style={{
        backgroundColor: "#efefef",
        color: "#471527",
        fontWeight: 600,
        textTransform: "capitalize"
      }}>{props.title}</span>
    );
  }
};

export const CustomNavigationItem: React.SFC<any> = (props: any) => {
  if (props.link) {
    return (
      <a href={props.link} title={props.title} style={{
        color: "#006494",
        fontWeight: props.isLinkActive ? "bold" : "normal"
      }}>{renderLinkIcon(props)} {props.title}</a>
    );
  } else {
    return (
      <span>{renderLinkIcon(props)} {props.title}</span>
    );
  }
};

export const CustomBreadcrumb: React.SFC<any> = (props: any) => {
  console.log('CustomBreadcrumb', props);
  return (
    <div>
      {
        Object.keys(props).map(key => <span>{key}: {props[key]}</span>)
      }
    </div>
  );
};

export default class CustomExtensions {
  private extensionService: ExtensionService = null;
  private triggerService: TriggerService = null;
  private providerService: ProviderService = null;
  private dataSourceService: DataSourceService = null;

  constructor() {
    this.extensionService = ExtensionService.getInstance();
    this.triggerService = TriggerService.getInstance();
    this.providerService = ProviderService.getInstance();
    this.dataSourceService = DataSourceService.getInstance();
  }

  public register(ctx: ApplicationCustomizerContext) {
    this.fetchProviders();
    // this.extensionService.registerExtension({
    //   id: "NavigationLeft",
    //   location: IntranetLocation.NavigationLeft,
    //   element: <div style={{lineHeight: '60px'}}>👉 <style>{`.valo-site-logo{display:flex}.valo-site-logo__link{margin-right:15px !important}`}</style></div>
    // });

    // this.extensionService.registerExtension({
    //   id: "NavigationLeft",
    //   location: IntranetLocation.NavigationLeft,
    //   element: (
    //     <React.Fragment>
    //       <Clock />
    //     </React.Fragment>
    //   )
    // });

    // this.extensionService.registerExtension({
    //   id: "NavigationRight",
    //   location: IntranetLocation.NavigationRight,
    //   element: <div style={{lineHeight: '60px', marginLeft: 'auto'}}>👈 <style>{`.valo-language-switcher-container{margin-left:7px}`}</style></div>
    // });

    // this.extensionService.registerExtension({
    //   id: "NavigationTop",
    //   location: IntranetLocation.NavigationTop,
    //   element: <div style={{textAlign: "center", height: "20px"}}>👆</div>
    // });

    this.extensionService.registerExtension({
      id: "NavigationBottom",
      location: IntranetLocation.NavigationBottom,
      element: (
        <div style={{textAlign: "center", padding: "15px"}}>
          <PrimaryButton onClick={async () => {
            const trigger = await this.triggerService.registerTrigger(IntranetTrigger.OpenEventCreationPanel);
            if (trigger) {
              trigger.invokeTrigger();
            }
          }}>Open page creation</PrimaryButton>
        </div>
      )
    });

    this.extensionService.registerExtension({
      id: "Footer",
      location: IntranetLocation.Footer,
      element: <div style={{background:"#1e6268",height:"400px",textAlign:"center",lineHeight:"400px"}}>
        Custom footer
      </div>
    });

    /**
     * New extension points available in version 1.6
     */
    // this.extensionService.registerExtension({
    //   id: "OverwriteNavigationGroupHeader",
    //   location: IntranetLocation.OverwriteNavigationGroupHeader,
    //   element: CustomGroupHeader
    // });

    // this.extensionService.registerExtension({
    //   id: "OverwriteNavigationItemLink",
    //   location: IntranetLocation.OverwriteNavigationItemLink,
    //   element: CustomNavigationItem
    // });

    this.extensionService.registerExtension({
      id: "OverwriteBreadcrumb",
      location: IntranetLocation.OverwriteBreadcrumb,
      element: CustomBreadcrumb
    });

    // this.extensionService.registerExtension({
    //   id: "ToolboxAction",
    //   location: IntranetLocation.ToolboxAction,
    //   element: [
    //     {
    //       title: "Extension 1",
    //       icon: "Code",
    //       description: "Extension 1 description",
    //       onClick: () => alert('You clicked on the extension 1 toolbox action.')
    //     } as ExtensionPointToolboxAction,
    //     {
    //       title: "Extension 2",
    //       icon: "QRCode",
    //       description: "Extension 2 description",
    //       onClick: () => alert('You clicked on the extension 2 toolbox action.')
    //     } as ExtensionPointToolboxAction
    //   ]
    // });

    // this.extensionService.registerExtension({
    //   id: "ToolboxPanelCreationAction",
    //   location: IntranetLocation.ToolboxPanelCreationAction,
    //   element: [
    //     {
    //       title: "Creation Extension 1",
    //       icon: "Code",
    //       description: "Creation extension 1 description",
    //       onClick: () => alert('You clicked on the creation extension 1 toolbox action.')
    //     } as ExtensionPointToolboxPanelCreationAction,
    //     {
    //       title: "Creation Extension 2",
    //       icon: "QRCode",
    //       description: "Creation extension 2 description",
    //       onClick: () => alert('You clicked on the creation extension 2 toolbox action.')
    //     } as ExtensionPointToolboxPanelCreationAction
    //   ]
    // });

    // Navigation items
    this.extraNavigationItems(ctx);


    // Multilingual (beta)
    this.fetchMultilingualInformation();


    /**
     * Single reference
     *
     * Important: If the custom data source is registered like this, you can only make use of it once per page.
     * Otherwise web parts share the same properties. If you want to make use of multiple instances, use: `dataSourcePrototype` instead.
     *
     */
    const dynamicDs = new DynamicPagingDataSource();
    this.dataSourceService.registerDataSource({
      dataSource: dynamicDs,
      id: "DynamicDataSource",
      name: "Custom dynamic data source"
    });

    const staticDs = new StaticDataSource();
    this.dataSourceService.registerDataSource({
      dataSource: staticDs,
      id: "StaticDataSource",
      name: "Custom static data source"
    });

    // const noPaging = new NoPagingDataSource();
    // this.dataSourceService.registerDataSource({
    //   dataSource: noPaging,
    //   id: "NoPagingDataSource",
    //   name: "Custom data source"
    // });

     /**
      *
      * Multi data source reference
      *
      * Important: This will be supported as of version 1.6
      *
      */
    this.dataSourceService.registerDataSource({
      dataSourcePrototype: NoPagingDataSource.prototype,
      id: "NoPagingDataSource",
      name: "Custom data source"
    });
  }

  /**
   * Retrieve a navigation file from another site and provide it to get rendered to the navigation
   *
   * IMPORTANT: Be sure to cache
   *
   * @param ctx
   */
  private async extraNavigationItems(ctx: ApplicationCustomizerContext) {
    const clientStorage = await this.providerService.getProvider<IClientStorageProvider>(IntranetProvider.ClientStorage);
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
        this.extensionService.registerExtension({
          id: "MegaMenuBeforeNavigationItems",
          location: IntranetLocation.MegaMenuAfterNavigationItems,
          element: navigationItems as MegaMenuItem[]
        });
      }
    }
  }

  private async fetchNavigation(ctx: ApplicationCustomizerContext) {
    try {
      const intranetUrl = "https://valointranetdev.sharepoint.com/sites/coffee-point";
      const navUrl = new URL(intranetUrl);
      let pathName = navUrl.pathname;
      // Check if the pathName starts with a slash (issue on IE11)
      if (pathName.indexOf("/") > 0) {
        pathName = `/${pathName}`;
      }
      const navUrlApi = `${intranetUrl}/_api/web/GetFileByServerRelativeUrl('${pathName}/config/navigation.json')/$value`;
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


  private async fetchProviders() {
    const configProvider = await this.providerService.getProvider<any>(IntranetProvider.Config);
    if (configProvider && configProvider.instance) {
      console.log(`Config retrieved: ${JSON.stringify(configProvider.instance)}`);
    } else {
      console.log(`Config not retrieved`);
    }

    const userProfileProvider = await this.providerService.getProvider<IUserProfileProvider>(IntranetProvider.UserProfile);
    if (userProfileProvider && userProfileProvider.instance) {
      console.log("Department:", await userProfileProvider.instance.getUserProperty("Department"));
      console.log("All properties:", await userProfileProvider.instance.getUserProperties());
    }
  }


  private async fetchMultilingualInformation() {
    const multilingualProvider = await this.providerService.getProvider<IMultilingualProvider>(IntranetProvider.Multilingual);
    if (multilingualProvider && multilingualProvider.instance) {
      const crntPage = await multilingualProvider.instance.getCurrentPage();
      if (crntPage && crntPage.UniqueId) {
        const pages = await multilingualProvider.instance.getPageConnections(crntPage.UniqueId);
        const sites = await multilingualProvider.instance.getSiteConnections();
        const languageTerms = await multilingualProvider.instance.getLanguageTerms();
      }
    }
  }
}
