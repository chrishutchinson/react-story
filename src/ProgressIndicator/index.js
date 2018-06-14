import React from "react";

export default ({ activePage, pageCount }) => (
  <div
    style={{
      textAlign: "right",
      padding: "0.8rem 1.8rem",
      fontSize: "2rem"
    }}
  >
    {activePage} / {pageCount}
  </div>
);
