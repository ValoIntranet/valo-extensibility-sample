import { BaseApplicationCustomizer } from '@microsoft/sp-application-base';
import CustomExtensions from './CustomExtensions';

const LOG_SOURCE: string = 'ExtendValoUiApplicationCustomizer';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ExtendValoUiApplicationCustomizer extends BaseApplicationCustomizer<{}> {

  public async onInit(): Promise<void> {
    const customExt = new CustomExtensions();
    customExt.register(this.context);

    return;
  }
}
