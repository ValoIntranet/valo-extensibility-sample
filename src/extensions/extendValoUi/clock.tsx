import * as React from 'react';
import { format } from 'date-fns';

export interface IClockProps {}

export interface IClockState {
  date: Date;
}

export default class Clock extends React.Component<IClockProps, IClockState> {
  private intervalID: number = null;

  constructor(props: IClockProps) {
    super(props);

    this.state = {
      date: new Date()
    };
  }


  public componentDidMount() {
    this.intervalID = window.setInterval(
      () => this.tick(),
      1000
    );
  }

  public componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  private tick() {
    this.setState({
      date: new Date()
    });
  }

  public render(): React.ReactElement<IClockProps> {
    return (
      <div style={{lineHeight:"60px"}}>
        {format(this.state.date, "DD/MM/YYYY HH:mm:ss")}

        <style>{`.valo-site-logo{display:flex}.valo-site-logo__link{margin-right:15px !important}`}</style>
      </div>
    );
  }
}
