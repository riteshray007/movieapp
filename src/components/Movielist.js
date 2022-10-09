import React, { Component } from "react";

import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import ReactPlayer from 'react-player'


export class Movielist extends Component {
  constructor() {
    super();

    this.state = {
      Hover: "",
      open: "",
      Movies: [],
      currpage: 1,
      pagearr: [1],
      favorites: [],
      arraylength: 0,
      link: "",
      trailerno: 0,
      maxtraileno: 0,
      // openid : 
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
      `https://api.themoviedb.org/3/movie/popular?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US&page=${this.state.currpage} `
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


  setopen(id) {
    // console.log(id);
    this.setState({
      open: id,
      trailerno: 0,
    });
    console.log(this.state.open);
    this.trailer(id);
  }

  async trailer(id) {
    console.log("open id - " + this.state.open);
    const trailres = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US`
    );
    let traildata = trailres.data.results;
    if (traildata.length == 0) {
      this.setState({
        link: '',
      })
      return;
    }
    // console.log(traildata);
    let trailfilt = traildata.filter((film) => {
      return film.official != false
    })

    // this.setState({
    //   keylist : trailfilt[0].key,
    // })
    // console.log(" = " + this.state.keylist);
    let max = trailfilt.length
    if (max == 0) {
      this.setState({
        link: `https://www.youtube.com/watch?v=${traildata[`${this.state.trailerno}`].key}`,
        maxtraileno: max,
      })
    }
    else {
      this.setState({
        link: `https://www.youtube.com/watch?v=${trailfilt[`${this.state.trailerno}`].key}`,
        maxtraileno: max,
      })
    }
    console.log("trailerno - " + this.state.trailerno);
  }

  setclose = () => {
    this.setState({
      open: "",
    })
  }

  async componentDidUpdate() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US&page=${this.state.currpage} `
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
  trailerincrement() {
    let x = this.state.trailerno;
    let max = this.state.maxtraileno;
    if (x < max - 1) {
      x++;
    }
    else {
      x = 0;
    }
    this.setState({
      trailerno: x,
    })
    this.trailer(this.state.open)
  }


  render() {
    // let data = JSON.parse(localStorage.getItem('movie-list') || '[]' )

    return (
      <>
        {/* <h1>{this.state.open}</h1> */}

        

          <div class="glitch-wrapper trending  ">
            <div class="glitch" data-glitch="Trending">  Trending  </div>
          </div>
        



        <div className="maincontent" >
          <div className="movielists">
            {this.state.Movies.map((n) => {

              return (
                <div
                  className="card movie-card"
                  onMouseEnter={() => this.setState({ hover: n.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                  onclick={() => this.setState}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${n.poster_path}`}
                    className="card-img-top movies-img"
                  />
                  <h4 className="card-title text-center movies-title">
                    {n.original_title}
                  </h4>
                  <h6 className="popularity text-center">
                    popularity - {n.popularity} &nbsp;&nbsp;&nbsp; Votes-{" "} {n.vote_average}/10 {" "}
                  </h6>
                  {this.state.hover == n.id && (
                    <>
                      <a className="btn btn-primary favorite " onClick={() => this.handlefavorites(n)} >
                        {this.state.favorites.includes(n.id) ? "Remove from Favorites" : 'Add to favorites'} </a>
                      <FontAwesomeIcon className="btn btn-primary play " icon={faYoutube} onClick={() => this.setopen(n.id)}></FontAwesomeIcon>
                    </>
                  )}
                  {/* <FontAwesomeIcon icon="fa-solid fa-clapperboard-play" /> */}
                  <Dialog
                    open={this.state.open == n.id}
                    onClose={this.setclose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    fullWidth={true}
                    maxWidth='md'>

                    <DialogActions style={{ display: 'flex', flexDirection: 'column' }} >

                      {/* let sr =  https://www.youtube.com/watch?v=&{this.state.keylist} ; */}

                      < ReactPlayer url={this.state.link} controls />

                      {/* <video src={this.state.link} controls  ></video> */}

                      <div style={{ margin: '2rem' }} >
                        <Button onClick={this.setclose} autoFocus> Close </Button>
                        <Button onClick={() => this.trailerincrement()} >  Next </Button>
                      </div>

                    </DialogActions>

                  </Dialog>
                </div>
              );
            })}

            {/* <div className='copyright'> <h2> COPYRIGHT &#169; 2022 @Ritesh-Ray 	&#174; </h2> </div> */}
          </div  >
        </div>
        <div className="pagechange" >

          <div className="pagina">
            <nav aria-label="...">
              <ul className="pagination" >
                <li className="page-item" >
                  <button
                    onClick={this.handelpageprevious}
                    className="page-link" >
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
      </>
    );
  }
}

export default Movielist;

//to install axios by - npm install axios
//axios is a library