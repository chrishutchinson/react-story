import React from "react";

import PreviousButton from "../PreviousButton";
import NextButton from "../NextButton";
import ProgressIndicator from "../ProgressIndicator";

import styles from "./style";

export const StoryContext = React.createContext();

class Story extends React.Component {
  static defaultProps = {
    nextButton: NextButton,
    previousButton: PreviousButton,
    progressIndicator: ProgressIndicator,
    outboundDelay: 0
  };

  state = {
    activePage: 0,
    outboundPage: null
  };

  setActivePage = nextPage => {
    const { outboundDelay } = this.props;
    const { activePage, pageCount } = this.state;

    if (nextPage < activePage && activePage === 1) return;
    if (nextPage > pageCount) return;

    this.setState(({ activePage }) => ({
      outboundPage: activePage,
      inboundPage: nextPage
    }));

    setTimeout(() => {
      this.setState(() => ({
        activePage: nextPage,
        outboundPage: null,
        inboundPage: null
      }));
    }, outboundDelay);
  };

  componentDidMount() {
    const { children, enableKeyboardControls } = this.props;

    this.setState(() => ({
      pageCount: React.Children.count(children)
    }));

    setTimeout(() => {
      this.setState({
        activePage: 1
      });
    }, 0);

    if (typeof document !== "undefined" && enableKeyboardControls) {
      document.addEventListener("keypress", e => {
        const { key } = e;

        switch (key) {
          case "ArrowRight":
            e.preventDefault();
            this.setActivePage(this.state.activePage + 1);
            break;
          case "ArrowLeft":
            e.preventDefault();
            this.setActivePage(this.state.activePage - 1);
            break;
        }
      });
    }
  }

  render() {
    const {
      children,
      nextButton: Next,
      previousButton: Previous,
      progressIndicator: ProgressIndicator,
      outboundDelay
    } = this.props;
    const { activePage, pageCount, inboundPage, outboundPage } = this.state;

    const handlers = {
      setActivePage: this.setActivePage
    };

    return (
      <StoryContext.Provider
        value={{
          activePage,
          outboundPage,
          inboundPage
        }}
      >
        <main style={styles.story()}>
          {React.Children.map(children, (c, index) =>
            React.cloneElement(c, {
              pageIndex: index + 1
            })
          )}
        </main>

        <aside style={styles.controls()}>
          <Previous {...this.state} handlers={handlers} />
          <Next {...this.state} handlers={handlers} />
        </aside>

        <aside style={styles.progress()}>
          <ProgressIndicator {...this.state} handlers={handlers} />
        </aside>
      </StoryContext.Provider>
    );
  }
}

export default Story;

export const Page = ({ pageIndex, style, className, children }) => (
  <StoryContext.Consumer>
    {({ activePage, outboundPage, inboundPage }) => {
      const isActive = pageIndex === activePage;
      const isOutbound = pageIndex === outboundPage;
      const isInbound = pageIndex === inboundPage;

      return (
        <div
          className={className}
          style={{
            ...styles.page({ isActive }),
            ...style
          }}
        >
          {children({
            isActive,
            isOutbound,
            isInbound
          })}
        </div>
      );
    }}
  </StoryContext.Consumer>
);
