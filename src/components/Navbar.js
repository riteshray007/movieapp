import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontStyle: "italic",
            marginTop: "0vh",
          }}
        >
          <h2 style={{ marginLeft: "5vw" }}>Movies</h2>
          <h2 style={{ marginLeft: "5vw" }}>favorites</h2>
        </div>
      </>
    );
  }
}

export default Navbar;
