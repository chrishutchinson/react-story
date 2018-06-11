// @flow
/* global document */

import React from "react";
import ReactDOM from "react-dom";

import Story, { Page, StoryContext } from "./Story";

const MyPage = ({ children, pageIndex }) => (
  <StoryContext.Consumer>
    {args =>
      children({
        ...args,
        pageIndex
      })
    }
  </StoryContext.Consumer>
);

const computeOpacity = (isActive, isOutbound, isInbound) => {
  console.log({ isActive, isOutbound, isInbound });
  if (isOutbound || !isActive) return 0;
  if (isActive || isInbound) return 1;
};

const SampleStory = () => (
  <Story outboundDelay={400}>
    <MyPage>
      {({ pageIndex, activePage }) => (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: pageIndex === activePage ? "red" : "green"
          }}
        >
          1
        </div>
      )}
    </MyPage>

    <Page>
      {({ isActive, isOutbound, isInbound }) => (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#FFF",

            transitionProperty: "opacity",
            transitionDuration: "0.4s",
            opacity: computeOpacity(isActive, isOutbound, isInbound)
          }}
        >
          {isActive ? "Yes" : "No"}
          {isOutbound ? "Yes" : "No"}
          {isInbound ? "Yes" : "No"}
        </div>
      )}
    </Page>
  </Story>
);

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById("app"));
};

render(SampleStory);
