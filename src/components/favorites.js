import React, { Component } from 'react'
// import { movies } from "./Moviesdata"

export class Favorites extends Component {

    constructor(){
        super()

        this.state={
            moviedata:[],
            genres : [  ]
        }
    }

    componentDidMount(){
        let moviesdata = JSON.parse(localStorage.getItem('movie-list'))
        let temparr = []

        let genreids = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        }
        temparr.unshift( 'All Movies' )
        moviesdata.map((n)=>{
            if(!temparr.includes(genreids[n.genre_ids[0]]))
            {
                temparr.push(genreids[n.genre_ids[0]])
            }
        })

        this.setState({
            moviedata : [...moviesdata],
            genres : [...temparr],
        })
    }

    render() {

        let genreids = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-Fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        }
        
        // let moviedata = movies.results
        return (
            <div className='main' >
                <div className='row'>
                    <div className='col-3' >
                        <ul class="list-group  genre-selector " >
                            {this.state.genres.map((n)=>{
                                return(
                                    <li  
                                    className="list-group-item genre-list " aria-current="true">{n}</li>
                                )
                            })}
                            
                        </ul>
                    </div>
                    <div className='col-8 ' >
                        <div className='row ' >
                            <input type='text' placeholder='Search'className='input-group-text col ' />
                            <input type='number' className='input-group-text  col numberinput' />
                        </div>
                        <div className='row' >
                            <table class="table"   >
                                <thead>
                                    <tr  >
                                        <th style={{width:'10%'}} ></th>
                                        <th scope="col" style={{ width: "40%" }} >Title</th>
                                        <th scope="col">Genere</th>
                                        <th scope="col">Popularity</th>
                                        <th scope="col"  >Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.moviedata.map((n) => {
                                        return (
                                            <tr>
                                                <th><img style={{width:'5rem' , height : '4rem'} } src={`https://image.tmdb.org/t/p/original${n.backdrop_path}`} /></th>
                                                <th scope="row">  {n.title}</th>
                                                <td>{genreids[n.genre_ids[0]]}</td>
                                                <td>{n.popularity}</td>
                                                <td>{n.vote_average}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Favorites