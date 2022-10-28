import React, { Component } from "react";
import {movies} from "./Moviesdata"

export class Banner extends Component {
  


  render() {
    // let movie = this.props.movies[1]
    let moviedata = movies.results[Math.floor(Math.random()*10)]
    let link = `https://image.tmdb.org/t/p/original${moviedata.backdrop_path}`
    // console.log(moviedata)
    return (
      <>
        <div
          className="card"
          style={{
            width: "98.5vw",
            height : "60vh",
            margin: "0.1vw",
            borderColor: "white",
            backgroundImage: `url(${link})`,
            // backgroundAttachment:'fixed',
            backgroundSize:'cover',
          }}
        >
          {/* <img
            src={`https://image.tmdb.org/t/p/original${moviedata.backdrop_path}`}
            className="card-img-top banner-img  "
            alt="..."
            style={{ borderRadius: "1vw" }}
          /> */}
          <h5 className="card-title title">  {moviedata.original_title} </h5>
          <p className="card-text subtitle">
           {moviedata.overview}
          </p>
        </div>
      </>
    );
  }
}

export default Banner;
