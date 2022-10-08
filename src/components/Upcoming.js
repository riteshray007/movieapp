import React, { Component } from "react";

import axios from "axios";
import Banner from "./Banner";

export class Upcoming extends Component {
    constructor() {
        super();

        this.state = {
            Hover: "",
            Movies: [],
            currpage: 1,
            pagearr: [1],
            favorites: [],
            arraylength: 0,
        };
    }

    handlepagenext = () => {
        this.setState(
            {
                currpage: this.state.currpage + 1,
            }
        );

        if (this.state.currpage == this.state.pagearr.length) {
            this.setState({

                pagearr: [...this.state.pagearr, this.state.pagearr.length + 1]
            })
            if (this.state.pagearr.length > 4) {
                this.setState({
                    arraylength: this.state.arraylength + 1,
                })
            }
        }
    };
    handelpageprevious = () => {
        if (this.state.currpage > 0) {
            this.setState(
                {
                    currpage: this.state.currpage - 1,
                }, this.handleprepage()
            )

        }
    };

    handleprepage = () => {
        let newarr
        if (this.state.currpage > 1) {
            newarr = this.state.pagearr.filter((d) => {
                return d < (this.state.pagearr.length)
            })
            if (this.state.arraylength > 0) {
                this.setState({
                    arraylength: this.state.arraylength - 1,
                })
            }
        }
        this.setState({
            pagearr: [...newarr]
        })
    }

    handlefavorites = (obj) => {
        let data = JSON.parse(localStorage.getItem('movie-list') || "[]")

        if (this.state.favorites.includes(obj.id)) {
            data = data.filter((film) => {
                return obj.id != film.id
            })
        }
        else {
            data.push(obj)
        }

        localStorage.setItem('movie-list', JSON.stringify(data))
        this.handlefavarray();

    }
    handlefavarray = () => {
        let data = JSON.parse(localStorage.getItem('movie-list') || '[]')

        let temp = data.map((i) => {
            return i.id
        })

        this.setState({ favorites: [...temp], })


    }

    async componentDidMount() {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US&page=${this.state.currpage} `
        );

        let data = JSON.parse(localStorage.getItem('movie-list') || '[]')
        let temp = data.map((i) => {
            return i.id
        })
        let datafromapi = res.data;
        this.setState({
            Movies: [...datafromapi.results],
            favorites: [...temp],
        });
    }

    async componentDidUpdate() {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US&page=${this.state.currpage} `
        );

        let datafromapi = res.data;
        this.setState({
            Movies: [...datafromapi.results],
        });
    };
    pageno(num) {

        this.setState({
            currpage: num,
        })
    }


    render() {
        // let data = JSON.parse(localStorage.getItem('movie-list') || '[]' )


        return (
            <>
                {/* <Banner> number = {this.state.Movies} </Banner> */}
                <h2 className="trending text-center">
                    <strong>Most Recent</strong>
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
                                />
                                <h4 className="card-title text-center movies-title">
                                    {n.original_title}
                                </h4>
                                <h6 className="popularity text-center">

                                    popularity - {n.popularity} &nbsp;&nbsp;&nbsp; Votes-{" "}
                                    {n.vote_average}/10{" "}
                                </h6>
                                {this.state.hover == n.id && (
                                    <>
                                        <a className="btn btn-primary favorite " onClick={() => this.handlefavorites(n)} >
                                            {this.state.favorites.includes(n.id) ? "Remove from Favorites" : 'Add to favorites'} </a>
                                    </>
                                )}

                            </div>
                        );
                    })}
                    <div>
                        <div className="pagina">
                            <nav aria-label="...">
                                <ul className="pagination">
                                    <li className="page-item ">
                                        <button
                                            onClick={this.handelpageprevious}
                                            className="page-link"
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {this.state.pagearr.slice(this.state.arraylength, this.state.pagearr.length).map((m) =>
                                    (<li>
                                        <button onClick={() => this.pageno(m)} className="page-link"> {m} </button>

                                    </li>)
                                    )}


                                    <li className="page-item">
                                        <button
                                            onClick={this.handlepagenext}
                                            className="page-link"
                                            href="#"
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    {/* <div className='copyright'> <h2> COPYRIGHT &#169; 2022 @Ritesh-Ray 	&#174; </h2> </div> */}
                </div>
            </>
        );
    }
}

export default Upcoming;

//to install axios by - npm install axios
//axios is a library