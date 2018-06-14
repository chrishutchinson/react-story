import React from "react";

export default ({ activePage, pageCount, handlers }) => (
  <div
    style={{
      alignSelf: "flex-end"
    }}
  >
    <button
      disabled={activePage === 1}
      onClick={() => handlers.setActivePage(activePage - 1)}
    >
      -1
    </button>
  </div>
);
