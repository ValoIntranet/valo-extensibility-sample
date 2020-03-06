import { BaseDataSourceProvider, IDataSourceData } from "@valo/extensibility";


export class NoPagingDataSource extends BaseDataSourceProvider<IDataSourceData> {
  private defaultArray: number[] = [1, 2, 3, 4, 5];

  public async getData() {
    const newArray = this.defaultArray.map(i => `Item ${i}`);
    return {
      items: newArray
    };
  }
}
