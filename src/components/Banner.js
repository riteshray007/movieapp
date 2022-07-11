import React, { Component } from "react";

export class Banner extends Component {
  render() {
    return (
      <>
        <div
          className="card"
          style={{
            width: "99vw",
            margin: "0.1vw",
            borderColor: "white",
          }}
        >
          <img
            src="https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg"
            className="card-img-top banner-img  "
            alt="..."
            style={{ borderRadius: "1vw" }}
          />
          <h5 className="card-title title"> Avangers </h5>
          <p className="card-text subtitle">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </>
    );
  }
}

export default Banner;
