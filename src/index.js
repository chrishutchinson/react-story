// @flow
/* global document */

import React from "react";
import ReactDOM from "react-dom";

import Story, { Page, StoryContext } from "./Story";

const NextButton = ({ state, handlers }) => (
  <button
    style={{
      width: "70%",
      height: "100%",
      background: "transparent",
      border: 0
    }}
    disabled={state.activePage === state.pageCount}
    onClick={() => handlers.setActivePage(state.activePage + 1)}
  >
    Tap to proceed
  </button>
);

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
  <Story nextButton={NextButton} outboundDelay={0}>
    <MyPage>
      {({ pageIndex, activePage }) => (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "red"
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
