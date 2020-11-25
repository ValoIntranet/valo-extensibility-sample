import * as React from 'react';
import { ExtensionService, ExtensionPointToolboxAction, IntranetLocation } from '@valo/extensibility';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export interface IToolboxComponentProps {
  extensionService: ExtensionService;
}

export interface IToolboxComponentState {
  isOpen: boolean;
}

export default class ToolboxComponent extends React.Component<IToolboxComponentProps, IToolboxComponentState> {

  constructor(props: IToolboxComponentProps) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  public componentDidMount() {
    if (this.props.extensionService) {
      this.props.extensionService.registerExtension({
        id: "ToolboxAction",
        location: IntranetLocation.ToolboxAction,
        element: [
          {
            title: "Extension 1",
            icon: "Code",
            description: "Extension 1 description",
            onClick: () => this.setState({ isOpen: true })
          } as ExtensionPointToolboxAction,
          {
            title: "Extension 2",
            icon: "QRCode",
            description: "Extension 2 description",
            onClick: () => this.setState({ isOpen: true })
          } as ExtensionPointToolboxAction
        ]
      });
    }
  }

  private onDismiss = () => {
    this.setState({ isOpen: false });
  }

  public render(): React.ReactElement<IToolboxComponentProps> {
    return (
      <Panel headerText="Pick your favorite Valo character"
             isOpen={this.state.isOpen}
             hasCloseButton={true}
             type={PanelType.medium}
             onDismiss={this.onDismiss}>
        <div style={{ textAlign: "center", lineHeight:"150px" }}>
          <div><input type="radio" id="2" name="favoriteImage" /><img src={require('../../../images/Asset_2.png')} height="150px" style={{marginLeft: "15px", verticalAlign:"middle"}} /></div>
          <div><input type="radio" id="3" name="favoriteImage" /><img src={require('../../../images/Asset_3.png')} height="150px" style={{marginLeft: "15px", verticalAlign:"middle"}} /></div>
          <div><input type="radio" id="4" name="favoriteImage" /><img src={require('../../../images/Asset_4.png')} height="150px" style={{marginLeft: "15px", verticalAlign:"middle"}} /></div>
          <div><input type="radio" id="5" name="favoriteImage" /><img src={require('../../../images/Asset_5.png')} height="150px" style={{marginLeft: "15px", verticalAlign:"middle"}} /></div>
          <div><input type="radio" id="6" name="favoriteImage" /><img src={require('../../../images/Asset_6.png')} height="150px" style={{marginLeft: "15px", verticalAlign:"middle"}} /></div>
          <div><input type="radio" id="7" name="favoriteImage" /><img src={require('../../../images/Asset_7.png')} height="150px" style={{marginLeft: "15px", verticalAlign:"middle"}} /></div>

          <PrimaryButton text="Submit" style={{ marginTop: "15px", float: "right" }} />
        </div>
      </Panel>
    );
  }
}
