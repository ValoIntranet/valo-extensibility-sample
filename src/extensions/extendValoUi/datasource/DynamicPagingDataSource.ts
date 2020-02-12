import { BaseDataSourceProvider, PagingType, IDataSourceData, IPagingSettings, PagingOption } from "@valo/extensibility";


export class DynamicPagingDataSource extends BaseDataSourceProvider<IDataSourceData> {
  private defaultArray: number[] = [1, 2, 3, 4, 5];

  public async getData(): Promise<IDataSourceData> {
    return new Promise<IDataSourceData>(resolve => {
      setTimeout(() => {
        const newArray = this.defaultArray.map(i => `Item ${i}`);
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
        const newArray = this.defaultArray.map(i => `Item ${i+(this.defaultArray.length * pageNr)}`);
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
}
