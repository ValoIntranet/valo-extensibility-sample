import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const renderLinkIcon = (props: any) => {
  if (props.properties && props.properties.iconName) {
    return <Icon iconName={props.properties.iconName} />;
  } else if (props.properties && props.properties.staticLink) {
    return <img src={require(`../../../images/Asset_3.png`)} height="45px" style={{ verticalAlign: "middle" }} />;
  } else {
    return <Icon iconName="GenericScan" />;
  }
};

export const CustomNavigationItem: React.SFC<any> = (props: any) => {
  if (props.link) {
    return (
      <a href={props.link} title={props.title} style={{
        color: "#006494",
        fontWeight: props.isLinkActive ? "bold" : "normal",
        lineHeight: props.properties && props.properties.staticLink ? "65px" : "100%",
        marginBottom: props.properties && props.properties.staticLink ? "10px" : "inherit"
      }}>{renderLinkIcon(props)} {props.title}</a>
    );
  } else {
    return (
      <span>{renderLinkIcon(props)} {props.title}</span>
    );
  }
};
