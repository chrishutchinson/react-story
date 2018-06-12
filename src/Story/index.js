import React from "react";

import PreviousButton from "../PreviousButton";
import NextButton from "../NextButton";

export const StoryContext = React.createContext();

class Story extends React.Component {
  static defaultProps = {
    nextButton: props => <NextButton {...props} />,
    previousButton: props => <PreviousButton {...props} />,
    outboundDelay: 0
  };

  state = {
    activePage: 1,
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
    const { children } = this.props;
    this.setState(() => ({
      pageCount: React.Children.count(children)
    }));
  }

  render() {
    const { children, nextButton, previousButton, outboundDelay } = this.props;
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
        <main
          style={{
            position: "relative",
            width: "100%",
            height: "100%"
          }}
        >
          {React.Children.map(children, (c, index) =>
            React.cloneElement(c, {
              pageIndex: index + 1
            })
          )}
        </main>

        <aside
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignContent: "space-between"
          }}
        >
          {previousButton({
            state: this.state,
            handlers
          })}
          {nextButton({
            state: this.state,
            handlers
          })}
        </aside>

        <aside>
          {activePage}/{pageCount}
        </aside>
      </StoryContext.Provider>
    );
  }
}

export default Story;

export const Page = ({ pageIndex, children }) => (
  <StoryContext.Consumer>
    {({ activePage, outboundPage, inboundPage }) => {
      const isActive = pageIndex === activePage;
      const isOutbound = pageIndex === outboundPage;
      const isInbound = pageIndex === inboundPage;

      return (
        <React.Fragment>
          {children({
            isActive,
            isOutbound,
            isInbound
          })}
        </React.Fragment>
      );
    }}
  </StoryContext.Consumer>
);
