import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <>
        <div className="navbar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontStyle: "italic",
            marginTop: "0vh",
            
          }}
        >
          <Link to="/" ><h2 style={{ marginLeft: "5vw" }}>Popular</h2></Link>
          < Link to="/TopRated" ><h2 style={{ marginLeft: "5vw" }}>Top Rated</h2></Link>
          < Link to="/mostrecent" ><h2 style={{ marginLeft: "5vw" }}>Most Recent</h2></Link>
          < Link to="/favorites" ><h2 style={{ marginLeft: "5vw" }}>favorites</h2></Link>
        </div>
      </>
    );
  }
}

export default Navbar;

