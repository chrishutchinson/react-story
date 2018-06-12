import React from "react";

export default ({ state, handlers }) => (
  <div
    style={{
      alignSelf: "flex-end"
    }}
  >
    <button
      disabled={state.activePage === 1}
      onClick={() => handlers.setActivePage(state.activePage - 1)}
    >
      -1
    </button>
  </div>
);
