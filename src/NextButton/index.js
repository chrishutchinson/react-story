import React from "react";

export default ({ activePage, pageCount, handlers }) => (
  <div
    style={{
      alignSelf: "flex-start"
    }}
  >
    <button
      disabled={activePage === pageCount}
      onClick={() => handlers.setActivePage(activePage + 1)}
    >
      +1
    </button>
  </div>
);
