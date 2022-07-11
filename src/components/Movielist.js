import React, { Component } from "react";

import Moviedata, { movies } from "./Moviesdata";

export class Movielist extends Component {
  render() {
    return (
      <>
        <h2 className="trending text-center">
          <strong>Trending</strong>
        </h2>
        <div className="movielists">
          {movies.results.map((n) => {
            return (
              <div className="card movie-card ">
                <img
                  src={`https://image.tmdb.org/t/p/original${n.poster_path}`}
                  className="card-img-top movies-img"
                  alt="..."
                />
                <h5 className="card-title text-center movies-title">
                  {n.original_title}
                </h5>
                <a className="btn btn-primary favorite ">Favourite</a>
              </div>
            );
          })}
          <div className="pagination">
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item disabled">
                  <a class="page-link">Previous</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item active" aria-current="page">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
}

export default Movielist;
