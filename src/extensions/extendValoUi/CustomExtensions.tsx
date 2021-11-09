import * as React from 'react';
import { IntranetLocation, IntranetTrigger, IntranetProvider, ExtensionService, TriggerService, ProviderService, ExtensionProvider, IUserProfileProvider, DataSourceService, ExtensionPointToolboxAction, ExtensionPointToolboxPanelCreationAction, MegaMenuItem, StorageType, IClientStorageProvider, IMyToolsProvider, INavigationHierarchyProvider, MegaMenuNavigationItem, InformationMessage, ContextActionType, ConnectWidgetService, ConnectWidgetSize } from '@valo/extensibility';
import { IMultilingualProvider } from '@valo/extensibility/lib/providerTypes/IMultilingualProvider';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import Clock from './clock';
import { NoPagingDataSource } from './datasource/NoPagingDataSource';
import { DynamicPagingDataSource } from './datasource/DynamicPagingDataSource';
import { StaticDataSource } from './datasource/StaticDataSource';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { PersonalNavigation } from './navigation/PersonalNavigation';
import { StaticNavigation } from './navigation/StaticNavigation';
import { CustomNavigationItem } from './customNavigationItem';
import { CustomGroupHeader } from './customGroupHeader';
import { Footer } from './footer';
import { CustomNotifications } from './customNotifications/CustomNotifications';
import ToolboxComponent from './toolboxComponent/ToolboxComponent';
import { CustomWidget } from './customWidget/CustomWidget';
import { CustomWidgetConfigComponent } from './customWidget/CustomWidgetConfig';

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
  private connectWidgetService: ConnectWidgetService = null;

  constructor() {
    this.extensionService = ExtensionService.getInstance();
    this.triggerService = TriggerService.getInstance();
    this.providerService = ProviderService.getInstance();
    this.dataSourceService = DataSourceService.getInstance();
    this.connectWidgetService = ConnectWidgetService.getInstance();
  }

  public register(ctx: ApplicationCustomizerContext) {
    // this.extensionService.registerExtension({
    //   id: "NavigationLeft",
    //   location: IntranetLocation.NavigationLeft,
    //   element: <div style={{lineHeight: '60px'}}>👉 <style>{`.valo-site-logo{display:flex}.valo-site-logo__link{margin-right:15px !important}`}</style></div>
    // });

    // this.extensionService.registerExtension({
    //   id: "NavigationLeft",
    //   location: IntranetLocation.NavigationBottom,
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



    // this.extensionService.registerExtension({
    //   id: "NavigationBottom",
    //   location: IntranetLocation.NavigationBottom,
    //   element: (
    //     <div style={{textAlign: "center", padding: "15px"}}>
    //       <PrimaryButton onClick={async () => {
    //         const trigger = await this.triggerService.registerTrigger(IntranetTrigger.OpenEventCreationPanel);
    //         if (trigger) {
    //           trigger.invokeTrigger();
    //         }
    //       }}>Open page creation</PrimaryButton>

    //       <PrimaryButton onClick={async () => {
    //         const trigger = await this.triggerService.registerTrigger(IntranetTrigger.GenericPanel);
    //         if (trigger) {
    //           trigger.invokeTrigger({
    //             siteUrl: ctx.pageContext.site.absoluteUrl,
    //             webUrl: ctx.pageContext.web.absoluteUrl,
    //             listId: "90bca00f-7b09-409b-9131-a35c5b9d5b8c", // The id of the list
    //             contextActionType: ContextActionType.create
    //           });
    //         }
    //       }}>Open GenericPanel</PrimaryButton>

    //       <PrimaryButton onClick={async () => {
    //         const trigger = await this.triggerService.registerTrigger(IntranetTrigger.EventsPanel);
    //         if (trigger) {
    //           trigger.invokeTrigger({
    //             siteUrl: ctx.pageContext.site.absoluteUrl,
    //             webUrl: ctx.pageContext.web.absoluteUrl,
    //             listId: "90bca00f-7b09-409b-9131-a35c5b9d5b8c", // The id of the list
    //             itemId: "1",                                    // List Item Id
    //             panelTitle: "<<Title of Event>>"
    //             panelBackgroundImageUrl: "<<Url of the image to show as panel Backgroud>>"
    //             contextActionType: ContextActionType.view
    //           });
    //         }
    //       }}>Open event panel</PrimaryButton>

    //       <CustomNotifications />
    //     </div>
    //   )
    // });

    // this.extensionService.registerExtension({
    //   id: "Footer",
    //   location: IntranetLocation.Footer,
    //   element: (
    //     <React.Fragment>
    //       <Footer />

    //       <ToolboxComponent extensionService={this.extensionService} />
    //     </React.Fragment>
    //   )
    // });

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

    // this.extensionService.registerExtension({
    //   id: "OverwriteBreadcrumb",
    //   location: IntranetLocation.OverwriteBreadcrumb,
    //   element: CustomBreadcrumb
    // });

    // this.extensionService.registerExtension({
    //   id: "ToolboxPanelCreationAction",
    //   location: IntranetLocation.ToolboxPanelCreationAction,
    //   element: [
    //     {
    //       title: "Creation Extension 2",
    //       icon: "QRCode",
    //       description: "Creation extension 2 description",
    //       onClick: () => alert('You clicked on the creation extension 2 toolbox action.')
    //     } as ExtensionPointToolboxPanelCreationAction
    //   ]
    // });


    // this.extensionService.registerExtension({
    //   id: "ToolboxPanelCreationAction2",
    //   location: IntranetLocation.ToolboxPanelCreationAction,
    //   element: [
    //     {
    //       title: "Creation Extension 1",
    //       icon: "Code",
    //       description: "Creation extension 1 description",
    //       onClick: () => alert('You clicked on the creation extension 1 toolbox action.')
    //     } as ExtensionPointToolboxPanelCreationAction
    //   ]
    // });
    this.registerWidget();

    this.extensionService.registerExtension({
      id: "ToolboxPanelCreationAction3",
      location: IntranetLocation.ToolboxPanelCreationAction,
      element: [
        {
          title: "Vacation request",
          icon: "Vacation",
          description: "Create a vacation request",
          onClick: async () => {
            const trigger = await this.triggerService.registerTrigger(IntranetTrigger.GenericPanel);
            if (trigger) {
              trigger.invokeTrigger({
                siteUrl: ctx.pageContext.site.absoluteUrl,
                webUrl: ctx.pageContext.web.absoluteUrl,
                listId: "77919457-4521-49bc-9ee6-72dbe7976709", // The id of the list
                contextActionType: ContextActionType.create
              });
            }
          }
        } as ExtensionPointToolboxPanelCreationAction
      ]
    });

    // Providers
    this.fetchProviders();

    // Navigation items
    // StaticNavigation.create(this.extensionService);
    // PersonalNavigation.create(ctx, this.providerService, this.extensionService);

    // Multilingual (1.6 beta)
    // this.fetchMultilingualInformation();

    // My Tools (1.7 beta)
    this.fetchMyTools();

    // Navigation Hierarchy (1.7 beta)
    this.fetchNavigation();

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


    // Get notifications on navigation triggers
    this.triggerService.registerTriggerListener({
      id: `CustomTriggerForSiteNavigation`,
      trigger: IntranetTrigger.PageNavigation,
      invokeTrigger: async () => {
        console.log('Component might need to be retriggered.');
      }
    });
  }

  private registerWidget(): void {
    this.connectWidgetService.registerWidget({
      id: "custom-widget-sample",
      size: ConnectWidgetSize.Single,
      title: "Widget sample",
      description: "This is a sample widget registered via extension",
      widgetComponentsFactory: (config) => [
        {
          id: "custom-widget-sample-1",
          title: "Tab 1",
          content: <CustomWidget widgetConfig={config} />
        }
      ],
      widgetConfigComponentFactory: (currentConfig: any, onConfigUpdated: (config: any) => void) => {
        return <CustomWidgetConfigComponent onConfigurationUpdated={onConfigUpdated} widgetConfiguration={currentConfig} />;
      }
    });
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

        console.log(pages, sites, languageTerms);
      }
    }
  }

  private async fetchMyTools() {
    const myToolsProvider = await this.providerService.getProvider<IMyToolsProvider>(IntranetProvider.MyTools);

    if (myToolsProvider && myToolsProvider.instance) {
      const myToolsInstance = myToolsProvider.instance;
      console.log(await myToolsInstance.getMyLinks(25, 0));
      console.log(await myToolsInstance.getOurLinks(25, 0));
    }
  }

  private async fetchNavigation() {
    const navProvider = await this.providerService.getProvider<INavigationHierarchyProvider>(IntranetProvider.NavigationHierarchy);

    if (navProvider && navProvider.instance) {
      const navInstance = navProvider.instance;
      // The navigation provider - provides changes via event emitting. In order to get the new changes, you have to provide the `getHierarchy` method a callback function.
      navInstance.getHierarchy("ExtensibilitySample", (hierarchy: MegaMenuNavigationItem[]) => {
        console.log(hierarchy);
      });
    }
  }
}
