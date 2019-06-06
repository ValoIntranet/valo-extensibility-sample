import * as React from 'react';
import { format } from 'date-fns';

export interface IWeatherProps {}

export interface IWeatherState {
  date: Date;
}

export default class Weather extends React.Component<IWeatherProps, IWeatherState> {

  public render(): React.ReactElement<IWeatherProps> {
    return (
      <div>
        <img src="//ssl.gstatic.com/onebox/weather/64/sunny.png" style={{maxHeight:"45px",verticalAlign:"middle"}} />
        <span style={{lineHeight:"60px"}}>20 °C</span>
      </div>
    );
  }
}
