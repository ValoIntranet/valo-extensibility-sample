import { BaseDataSourceProvider, PagingType, DataSourceData } from "@valo/extensibility";


export class DynamicPagingDataSource extends BaseDataSourceProvider {
  private defaultArray: number[] = [1, 2, 3, 4, 5];

  public async getData(lastUpdated: string): Promise<DataSourceData> {
    return new Promise<DataSourceData>(resolve => {
      setTimeout(() => {
        const newArray = this.defaultArray.map(i => `Item ${i}`);
        console.log(newArray);
        resolve({
          items: newArray
        } as DataSourceData);
      }, 2000);
    });
  }

  public async getPagedData(pageNr: number): Promise<DataSourceData> {
    if (pageNr === 0) {
      return this.getData(null);
    }

    return new Promise<DataSourceData>(resolve => {
      setTimeout(() => {
        const newArray = this.defaultArray.map(i => `Item ${i+(this.defaultArray.length * pageNr)}`);
        console.log(newArray);
        resolve({
          items: newArray
        } as DataSourceData);
      }, 500 * pageNr);
    });
  }

  public getPagingType() {
    return PagingType.dynamic;
  }

  public getNumberOfPages(): number {
    return 5;
  }
}
