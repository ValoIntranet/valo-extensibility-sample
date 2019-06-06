import * as React from 'react';
import { IntranetLocation, IntranetTrigger, IntranetProvider, ExtensionService, TriggerService, ProviderService, ExtensionProvider, IUserProfileProvider, DataSourceService } from '@valo/extensibility';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import Clock from './clock';
import Weather from './weather';
import { NoPagingDataSource } from './datasource/NoPagingDataSource';
import { DynamicPagingDataSource } from './datasource/DynamicPagingDataSource';
import { StaticDataSource } from './datasource/StaticDataSource';

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

    const noPaging = new NoPagingDataSource();
    this.dataSourceService.registerDataSource({
      dataSource: noPaging,
      id: "NoPagingDataSource",
      name: "Custom data source"
    });

    this.providerService.registerProvider(IntranetProvider.Config, (config) => {
      if (config && config.instance) {
        console.log(`Config retrieved: ${JSON.stringify(config.instance)}`);
      } else {
        console.log(`Config not retrieved`);
      }
    });

    this.providerService.registerProvider(IntranetProvider.UserProfile, async (userProfileService: ExtensionProvider<IUserProfileProvider>) => {
      if (userProfileService && userProfileService.instance) {
        debugger;
        console.log("Department:", await userProfileService.instance.getUserProperty("Department"));
      }
    });

    // this.extensionService.registerExtension({
    //   id: Guid.newGuid().toString(),
    //   location: Location.NavigationLeft,
    //   element: <div style={{lineHeight: '60px', display: 'inline-block', marginRight: 'auto'}}>👉 <style>{`.valo-site-logo{display:flex}.valo-site-logo__link{margin-right:15px !important}`}</style></div>
    // });

    this.extensionService.registerExtension({
      id: "NavigationLeft",
      location: IntranetLocation.NavigationLeft,
      element: (
        <React.Fragment>
          <Clock />
          {/* <span style={{width:"25px",textAlign:"center"}}>-</span
          <Weather /> */}
        </React.Fragment>
      )
    });

    this.extensionService.registerExtension({
      id: "NavigationRight",
      location: IntranetLocation.NavigationRight,
      element: <div style={{lineHeight: '60px', marginLeft: 'auto'}}>👈 <style>{`.valo-language-switcher-container{margin-left:7px}`}</style></div>
    });

    // this.extensionService.registerExtension({
    //   id: "NavigationTop",
    //   location: IntranetLocation.NavigationTop,
    //   element: <div style={{textAlign: "center", height: "20px"}}>👆</div>
    // });

    // this.extensionService.registerExtension({
    //   id: "NavigationBottom",
    //   location: IntranetLocation.NavigationBottom,
    //   element: <div style={{textAlign: "center", height: "20px"}}>👇</div>
    // });

    this.extensionService.registerExtension({
      id: "Footer",
      location: IntranetLocation.Footer,
      element: <div style={{background:"#1e6268",height:"400px",textAlign:"center",lineHeight:"400px"}}>This is the custom footer</div>
    });


    this.extensionService.registerExtension({
      id: "ToolboxAction",
      location: IntranetLocation.ToolboxAction,
      element: (
        <Link onClick={() => {
                this.triggerService.registerTrigger(IntranetTrigger.OpenPageCreationPanel, (listener) => {
                  listener.invokeTrigger();
                });
              }}
              title={"Custom action"}
              className={`valo-toolbox__tool-menu-item`}>
          <span className="valo-toolbox__tool-menu-item__name">Our custom action</span>
          <Icon className={`valo-toolbox__tool-menu-item__icon fabIconSmall_b61ca341`} iconName={"HeartFill"} />
        </Link>
      )
    });
  }
}
