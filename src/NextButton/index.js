import React from "react";

export default ({ state, handlers }) => (
  <div
    style={{
      alignSelf: "flex-start"
    }}
  >
    <button
      disabled={state.activePage === state.pageCount}
      onClick={() => handlers.setActivePage(state.activePage + 1)}
    >
      +1
    </button>
  </div>
);
