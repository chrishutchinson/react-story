/* global document */

import React from "react";
import ReactDOM from "react-dom";

import Story, { Page, StoryContext } from "./Story";

const progressItemStyle = {
  listStyleType: "none",
  flexGrow: 1,
  height: "0.3rem",
  backgroundColor: "#000",
  maxWidth: "3rem",
  margin: "0 0.2rem"
};

const ProgressBar = ({ state, handlers }) => (
  <ul
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }}
  >
    {new Array(state.pageCount).fill(null).map((_, index) => (
      <li
        style={{
          ...progressItemStyle,
          opacity: state.activePage > index ? 1 : 0.2
        }}
        key={index}
        onClick={() => handlers.setActivePage(index + 1)}
      />
    ))}
  </ul>
);

const buttonStyle = {
  height: "100%",
  background: "transparent",
  border: 0,
  fontSize: "3rem",
  margin: 0,
  padding: "0 1rem"
};

const PreviousButton = ({ state, handlers }) => (
  <button
    style={{
      ...buttonStyle,
      width: "25%",
      textAlign: "left"
    }}
    disabled={state.activePage === 1}
    onClick={() => handlers.setActivePage(state.activePage - 1)}
  >
    ◀
  </button>
);

const NextButton = ({ state, handlers }) => (
  <button
    style={{
      ...buttonStyle,
      width: "75%",
      textAlign: "right",
      backgroundColor:
        state.activePage === 1 ? "rgba(0,0,255,0.1)" : "rgba(0,0,255,0)",
      transitionProperty: "background-color",
      transitionDuration: "0.4s"
    }}
    disabled={state.activePage === state.pageCount}
    onClick={() => handlers.setActivePage(state.activePage + 1)}
  >
    ▶
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
  if (!isActive || isOutbound) return 0;
  if (isActive || isInbound) return 1;
};

const SampleStory = () => (
  <Story
    nextButton={NextButton}
    previousButton={PreviousButton}
    progressIndicator={ProgressBar}
    outboundDelay={800}
    enableKeyboardControls={true}
  >
    <MyPage>
      {({ pageIndex, activePage, outboundPage, inboundPage }) => (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#77869A",
            color: "#FFF",
            padding: "2rem",
            opacity: computeOpacity(
              pageIndex === activePage,
              pageIndex === outboundPage,
              pageIndex === inboundPage
            ),
            transitionProperty: "opacity",
            transitionDuration: "0.4s",
            transitionDelay: "0.4s"
          }}
        >
          <h1
            style={{
              opacity: pageIndex === outboundPage ? 0 : 1,
              transitionProperty: "opacity",
              transitionDuration: "0.4s"
            }}
          >
            Headline
          </h1>
        </div>
      )}
    </MyPage>

    <Page>
      {({ isActive, isOutbound, isInbound }) => (
        <h1
          style={{
            opacity: computeOpacity(isActive, isOutbound, isInbound),
            transitionProperty: "opacity",
            transitionDuration: "0.4s",
            transitionDelay: isOutbound ? "0s" : "0.4s"
          }}
        >
          Foo bar
        </h1>
      )}
    </Page>
  </Story>
);

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById("app"));
};

render(SampleStory);
