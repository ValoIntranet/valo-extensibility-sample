import * as React from 'react';
import { ConnectWidgetConfigurationComponent, ConnectWidgetConfigurationProps } from '@valo/extensibility/lib/models/connectWidget/';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface ICustomWidgetConfig {
    title: string;
    text: string;
}

export interface ICustomWidgetState {
    title: string;
    text: string;
}

export class CustomWidgetConfigComponent extends ConnectWidgetConfigurationComponent<ICustomWidgetConfig, ICustomWidgetState> {

    constructor(props: ConnectWidgetConfigurationProps<ICustomWidgetConfig>) {
        super(props);
        this.state = {
            title: this.props.widgetConfiguration ? this.props.widgetConfiguration.title : '',
            text: this.props.widgetConfiguration ? this.props.widgetConfiguration.text : ''
        };
    }

    public render() {
        return <div>
            <TextField label="Title" value={this.state.title} onChange={this.titleChanged}></TextField>
            <TextField multiline label="Text" value={this.state.text} onChange={this.textChanged}></TextField>
        </div>;
    }

    private titleChanged = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string) => {
        this.setState({title: newText}, () => this.props.onConfigurationUpdated(this.state));
    }

    private textChanged = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string) => {
        this.setState({text: newText}, () => this.props.onConfigurationUpdated(this.state));
    }
}