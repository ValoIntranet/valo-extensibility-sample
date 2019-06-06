import { BaseDataSourceProvider } from "@valo/extensibility";


export class NoPagingDataSource extends BaseDataSourceProvider {
  private defaultArray: number[] = [1, 2, 3, 4, 5];

  public async getData(lastUpdated: string) {
    const newArray = this.defaultArray.map(i => `Item ${i}`);
    console.log(newArray);
    return {
      items: newArray
    };
  }
}
