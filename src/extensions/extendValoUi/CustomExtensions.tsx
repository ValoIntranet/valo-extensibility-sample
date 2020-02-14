import * as React from 'react';
import { IntranetLocation, IntranetTrigger, IntranetProvider, ExtensionService, TriggerService, ProviderService, ExtensionProvider, IUserProfileProvider, DataSourceService } from '@valo/extensibility';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import Clock from './clock';
import { NoPagingDataSource } from './datasource/NoPagingDataSource';
import { DynamicPagingDataSource } from './datasource/DynamicPagingDataSource';
import { StaticDataSource } from './datasource/StaticDataSource';

export const CustomGroupHeader: React.SFC<any> = (props: any) => {
  return (
    <span>
      {props && props.title}
    </span>
  );
};

export const CustomNavigationItem: React.SFC<any> = (props: any) => {
  return (
    <span>
      {props && props.title} - {props && props.isLinkActive ? "true" : "false"}
    </span>
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

  public register() {
    this.fetchProviders();
    // this.extensionService.registerExtension({
    //   id: "NavigationLeft",
    //   location: IntranetLocation.NavigationLeft,
    //   element: <div style={{lineHeight: '60px'}}>👉 <style>{`.valo-site-logo{display:flex}.valo-site-logo__link{margin-right:15px !important}`}</style></div>
    // });

    this.extensionService.registerExtension({
      id: "NavigationLeft",
      location: IntranetLocation.NavigationLeft,
      element: (
        <React.Fragment>
          <Clock />
        </React.Fragment>
      )
    });

    this.extensionService.registerExtension({
      id: "NavigationRight",
      location: IntranetLocation.NavigationRight,
      element: <div style={{lineHeight: '60px', marginLeft: 'auto'}}>👈 <style>{`.valo-language-switcher-container{margin-left:7px}`}</style></div>
    });

    this.extensionService.registerExtension({
      id: "NavigationTop",
      location: IntranetLocation.NavigationTop,
      element: <div style={{textAlign: "center", height: "20px"}}>👆</div>
    });

    this.extensionService.registerExtension({
      id: "NavigationBottom",
      location: IntranetLocation.NavigationBottom,
      element: <div style={{textAlign: "center", height: "20px"}}>
        👇

      </div>
    });

    this.extensionService.registerExtension({
      id: "Footer",
      location: IntranetLocation.Footer,
      element: <div style={{background:"#1e6268",height:"400px",textAlign:"center",lineHeight:"400px"}}>
        {
          location.href === "https://valomodern.sharepoint.com/sites/tea-point" ? (
            <p>HOME</p>
          ) : (
            <p>Other page</p>
          )
        }
      </div>
    });

    /**
     * New extension points available in version TBD
     */
    this.extensionService.registerExtension({
      id: "OverwriteNavigationGroupHeader",
      location: IntranetLocation.OverwriteNavigationGroupHeader,
      element: CustomGroupHeader
    });

    this.extensionService.registerExtension({
      id: "OverwriteNavigationItemLink",
      location: IntranetLocation.OverwriteNavigationItemLink,
      element: CustomNavigationItem
    });



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
      * Important: This will be supported as of version TBD
      *
      */
    this.dataSourceService.registerDataSource({
      dataSourcePrototype: NoPagingDataSource.prototype,
      id: "NoPagingDataSource",
      name: "Custom data source"
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
}
