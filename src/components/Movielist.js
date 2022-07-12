import React, { Component } from "react";

import axios from "axios";

export class Movielist extends Component {
  constructor() {
    super();

    this.state = {
      hover: "",
      Movies: [],
      currpage:70,
    };
  }

  handlepagenext = () => {
    this.setState({
      currpage: this.state.currpage + 1
    } ,this.changemovies);
  };
  handelpageprevious = ()=>{
    this.setState({
      currpage : this.state.currpage -1 
    } , this.changemovies)
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US&page=${this.state.currpage} `
    );

    let datafromapi = res.data;
    this.setState({
      Movies: [...datafromapi.results],
    });
  }

    changemovies = async()=>{
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US&page=${this.state.currpage} `
    );

    let datafromapi = res.data;
    this.setState({
      Movies: [...datafromapi.results],
    });
  }



  render() {
    return (
      <>
        <h2 className="trending text-center">
          <strong>Trending</strong>
        </h2>
        <div className="movielists">
          {this.state.Movies.map((n) => {
            return (
              <div
                className="card movie-card"
                onMouseEnter={() => this.setState({ hover: n.id })}
                onMouseLeave={() => this.setState({ hover: "" })}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${n.poster_path}`}
                  className="card-img-top movies-img"
                  alt="..."
                />
                <h5 className="card-title text-center movies-title">
                  {n.original_title}
                </h5>
                <h6 className="popularity text-center   ">
                  {" "}
                  popularity - {n.popularity} &nbsp;&nbsp;&nbsp; Votes-{" "}
                  {n.vote_average}/10{" "}
                </h6>
                {this.state.hover == n.id && (
                  <a className="btn btn-primary favorite ">Favourite</a>
                )}
              </div>
            );
          })}
          <div>
            <div className="pagina">
              <nav aria-label="...">
                <ul class="pagination">
                  <li class="page-item ">
                    <button onClick={this.handelpageprevious}  class="page-link">Previous</button>
                  </li>
                  
                  <li class="page-item">
                    <button onClick={this.handlepagenext} class="page-link">
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Movielist;
