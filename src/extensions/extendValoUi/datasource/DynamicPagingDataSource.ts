import { BaseDataSourceProvider, PagingType } from "@valo/extensibility";


export class DynamicPagingDataSource extends BaseDataSourceProvider {
  private defaultArray: number[] = [1, 2, 3, 4, 5];

  public async getData(lastUpdated: string) {
    const newArray = this.defaultArray.map(i => `Item ${i}`);
    console.log(newArray);
    return {
      items: newArray
    };
  }

  public async getPagedData(pageNr: number) {
    if (pageNr === 0) {
      return this.getData(null);
    }
    const newArray = this.defaultArray.map(i => `Item ${i+(this.defaultArray.length * pageNr)}`);
    console.log(newArray);
    return {
      items: newArray
    };
  }

  public getPagingType() {
    return PagingType.dynamic;
  }

  public getNumberOfPages(): number {
    return 5;
  }
}
