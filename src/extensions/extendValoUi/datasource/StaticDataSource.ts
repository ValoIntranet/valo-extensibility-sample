import { BaseDataSourceProvider, PagingType, IDataSourceData, IPagingSettings, PagingOption } from "@valo/extensibility";
import { IPropertyPaneGroup, PropertyPaneSlider } from '@microsoft/sp-webpart-base';

export class StaticDataSource extends BaseDataSourceProvider<IDataSourceData> {
  private nrOfItems: number = 30;

  public getConfigProperties(): IPropertyPaneGroup[] {
    return [
      {
        groupName: "Custom data source",
        groupFields: [
          PropertyPaneSlider('itemsCountPerPage', {
            min: 1,
            max: this.nrOfItems,
            showValue: true,
            step: 1,
            value: this.properties.itemsCountPerPage,
            label: "Number of items per page"
          })
        ],
        isCollapsed: false
      }
    ];
  }

  public async getData() {
    let newArray = [];
    for (let i = 1; i <= this.nrOfItems; i++) {
      newArray.push(`Item ${i}`);
    }
    return {
      items: newArray,
      totalResults: this.nrOfItems
    };
  }

  public getPagingSettings(): IPagingSettings {
    return {
      pagingType: PagingType.static,
      pagingOptions: [
        { key: PagingOption.Top, text: "Top" },
        { key: PagingOption.Bottom, text: "Bottom" },
      ]
    };
  }
}
