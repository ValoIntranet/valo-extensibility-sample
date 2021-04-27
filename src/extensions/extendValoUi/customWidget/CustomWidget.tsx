import * as React from 'react';
import { ICustomWidgetConfig } from './CustomWidgetConfig';

export interface ICustomWidgetProps {
    widgetConfig: ICustomWidgetConfig;
}

export class CustomWidget extends React.Component<ICustomWidgetProps, {}> {
    public render() {
        return this.props.widgetConfig ? <div>
            <h2>{this.props.widgetConfig.title}</h2>
            <p>{this.props.widgetConfig.text}</p>
            <a href="https://valointranet.com">Valo Intranet</a>
        </div> : <div>Widget is not configured</div>;
    }
}