import * as React from 'react';

export const CustomGroupHeader: React.SFC<any> = (props: any) => {
  // if (props.myStaticCustomProperty) {
  //   return (
  //     <h2>{props.title}</h2>
  //   );
  // }

  // if (props.renderDefault) {
  //   return props.fallbackElm;
  // }

  if (props.link) {
    return (
      <a href={props.link} title={props.title} style={{
        backgroundColor: "#efefef",
        color: "pink",
        fontWeight: 600,
        textTransform: "capitalize"
      }}>{props.title}</a>
    );
  } else {
    return (
      <span style={{
        backgroundColor: "#efefef",
        color: "#471527",
        fontWeight: 600,
        textTransform: "capitalize"
      }}>{props.title}</span>
    );
  }
};
