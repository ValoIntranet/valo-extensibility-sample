import { Guid } from "@microsoft/sp-core-library";
import { IPropertyPaneDropdownOption, PropertyPaneDropdown } from "@microsoft/sp-webpart-base";
import { BaseDataSourceProvider, PagingType, IPagingSettings, PagingOption, DynamicDataEventEmitter, IDynamicDataEventSource, IDataSourceData } from "@valo/extensibility";

export interface IDynamicPagingDataSourceProps extends IDataSourceData {
  searchBoxSourceId: string;
}

export class DynamicPagingDataSource extends BaseDataSourceProvider<IDynamicPagingDataSourceProps> {
  private dynamicDataEventsEmitter: DynamicDataEventEmitter;
  private eventEmitterId: Guid;
  private lastSearchBoxSourceId: string;
  private lastSearchBoxPropertyName: string;
  private searchBoxEventSource : IDynamicDataEventSource;

  private defaultArray: number[] = [1, 2, 3, 4, 5];

  public init(ctx, properties, updateTriggerFnc) {

    super.init(ctx, properties, updateTriggerFnc);

    this.eventEmitterId = Guid.newGuid();
    this.dynamicDataEventsEmitter = DynamicDataEventEmitter.getInstance();
  }

  /**
   * Initialize the dynamic data control
   */
  public initDynamicData() {
    this.onSearchBoxPropertyChange();
  }

  /**
   *  When a different search refiner option gets selected, unregister the previous data source listener and registers a new one if applicable
   */
  private onSearchBoxPropertyChange = (triggerUpdata?: boolean) => {
    // If placeholder was selected, set to null instead of "" to simplify the rest of the code
    this.properties.searchRefinersSourceId = this.properties.searchRefinersSourceId || null;

    // Unsubscribe from the previous event source
    if (this.lastSearchBoxSourceId && this.searchBoxEventSource && this.searchBoxEventSource.eventName) {
      this.dynamicDataEventsEmitter.unsubscribe(this.searchBoxEventSource.eventName, this.eventEmitterId.toString());
    }

    // Check if search refiners web part exists, and bind the current data source to it
    if (this.properties.searchRefinersSourceId) {
      this.searchBoxEventSource = this.dynamicDataEventsEmitter.tryGetEventSource(this.properties.searchRefinersSourceId, this.ctx.instanceId, this.onSearchBoxPropertyChange);
      if (this.searchBoxEventSource && this.searchBoxEventSource.eventName) {
        this.dynamicDataEventsEmitter.subscribe(this.searchBoxEventSource.eventName, this.eventEmitterId.toString(), (propertyName: string) => {
          // Render the web part again with each search query
          this.updateTriggerFnc();
        });
      }
    }

    this.lastSearchBoxSourceId = this.properties.searchRefinersSourceId;
    if (this.searchBoxEventSource && this.searchBoxEventSource.properties && this.searchBoxEventSource.properties.length > 0) {
      this.lastSearchBoxPropertyName = this.searchBoxEventSource.properties[0];
    }

    this.updateTriggerFnc();
  }

  /**
   * Get the People Presense Data Source propeties
   */
  public getConfigProperties() {
    const baseProperties = super.getConfigProperties();

    baseProperties.unshift({
      groupName: "Connected Web Parts",
      groupFields: [
        PropertyPaneDropdown('searchBoxSourceId', {
          label: "Select searchbox web part",
          options: this.getDynamicConnections(),
          selectedKey: this.properties.searchBoxSourceId || ""
        })
      ],
      isCollapsed: true
    });

    return baseProperties;
  }



  public async getData(): Promise<IDataSourceData> {
    return new Promise<IDataSourceData>(resolve => {
      setTimeout(() => {
        const searchText = this.searchBoxEventSource && this.lastSearchBoxPropertyName ? this.dynamicDataEventsEmitter.getPropertyValue(this.searchBoxEventSource.eventSourceInstanceId, this.lastSearchBoxPropertyName) : null;

        const newArray = this.defaultArray.map(i => `${searchText || "Item"} ${i}`);
        console.log(newArray);
        resolve({
          items: newArray,
          totalResults: this.defaultArray.length * this.getPageCount()
        } as IDataSourceData);
      }, 2000);
    });
  }

  public async getPagedData(pageNr: number): Promise<IDataSourceData> {
    if (pageNr === 0) {
      return this.getData();
    }

    return new Promise<IDataSourceData>(resolve => {
      setTimeout(() => {
        const searchText = this.searchBoxEventSource && this.lastSearchBoxPropertyName ? this.dynamicDataEventsEmitter.getPropertyValue(this.searchBoxEventSource.eventSourceInstanceId, this.lastSearchBoxPropertyName) : null;

        const newArray = this.defaultArray.map(i => `${searchText || "Item"} ${i+(this.defaultArray.length * pageNr)}`);
        console.log(newArray);
        resolve({
          items: newArray,
          totalResults: this.defaultArray.length * this.getPageCount()
        } as IDataSourceData);
      }, 500 * pageNr);
    });
  }

  public getPagingSettings(): IPagingSettings {
    return {
      pagingType: PagingType.dynamic,
      pagingOptions: [
        { key: PagingOption.Top, text: "Top" },
        { key: PagingOption.Bottom, text: "Bottom" },
      ]
    };
  }

  public getPageCount(): number {
    return 5;
  }




  private getDynamicConnections = () => {
    const webPartId=  "4e1bba05-8bee-4d6e-bee4-2538fbd4e6ba";
    const dataSources = this.dynamicDataEventsEmitter.getAvailableSources(webPartId);

    if (dataSources) {
      const options = dataSources.map(ds => ({
        key: ds.eventSourceInstanceId,
        text: ds.title
      }));

      let placeholderItem = options.length > 0 ? "Select Search Box" : "Search Box available";
      options.unshift({ key: "", text: placeholderItem });
      return options;
    }
    return [];
  }
}
