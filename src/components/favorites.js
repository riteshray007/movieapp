import React, { Component } from 'react'
// import { movies } from "./Moviesdata"

export class Favorites extends Component {

    constructor(){
        super()

        this.state={
            moviedata:[],
            genres : [],
            currgenre : 'All Movies',
            currentsearch : '',
            maxrow : 5,
        }
    }
    Handlecurrentgenre = (genre)=>{
        this.setState({
            currgenre : genre,
        })
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

    handlesearchchange= (e)=>{
        this.setState({
            currentsearch : e.target.value ,
        })
    }
    handledelete = (ID)=>{
            let tempa = this.state.moviedata.filter((n)=> n.id != ID )

            this.setState({
                moviedata : [...tempa]
            })

            localStorage.setItem( 'movie-list' , JSON.stringify(tempa))
    }
    handlepopularityinc = ()=>{
        let temp = this.state.moviedata.sort(function(a,b){
            return a.popularity - b.popularity
        })

        this.setState({
            moviedata : [...temp],
        })
    }
    handlepopularitydec= ()=>{
        let temp = this.state.moviedata.sort(function(a, b){
            return b.popularity - a.popularity
        })

        this.setState({
            moviedata : [...temp]
        })
    }
    handleratinginc=()=>{
        let temp = this.state.moviedata.sort(function(a,b){
            return a.vote_average - b.vote_average
        })
        this.setState({
            moviedata : [...temp]
        })
    }
    handleratingdec=()=>{
        let temp = this.state.moviedata.sort(function(a,b){
            return b.vote_average - a.vote_average
        })
        this.setState({
            moviedata : [...temp]
        })
    }

    render() {

        let filterarr = []

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
        if(this.state.currgenre == 'All Movies'){
            filterarr = this.state.moviedata
        }
        else{
            filterarr = this.state.moviedata.filter((data) => genreids[data.genre_ids[0]] == this.state.currgenre)
        }
        if(this.state.currentsearch === "" ){
            
        }
        else{
            filterarr = filterarr.filter((n) => {
                let title = n.title.toLowerCase()
                return title.includes(this.state.currentsearch.toLowerCase().trim())
            })
        }

        



        
        // let moviedata = movies.results
        return (
            <div className='main' >
                <div className='row'>
                    <div className='col-3' >
                        <ul class="list-group  genre-selector " >
                            {this.state.genres.map((n)=>
                                this.state.currgenre == n? 
                                <li  
                                    className="list-group-item genre-list " >{n}</li>
                                    :
                                    <li  
                                    className="list-group-item genre-list-hover " 
                                    onClick={()=>this.Handlecurrentgenre(n)} >{n}</li>
                            )}
                            
                        </ul>
                    </div>
                    <div className='col-8 ' >
                        <div className='row ' >
                            <input type='text' placeholder='Search'className='input-group-text col '
                             onChange={(e)=>this.setState({ currentsearch : e.target.value  })}  />
                            <input type='number' className='input-group-text  col numberinput' value={this.state.maxrow}  />
                        </div>
                        <div className='row' >
                            <table class="table"   >
                                <thead>
                                    <tr  >
                                        <th style={{width:'10%'}} ></th>
                                        <th scope="col" style={{ width: "40%" }} >Title</th>
                                        <th scope="col">Genere</th> 
                                        <th scope="col"> <i class="fa-solid fa-sort-up" onClick={this.handlepopularitydec} ></i> Popularity <i class="fa-solid fa-sort-down" onClick={this.handlepopularityinc} ></i> </th>
                                        <th scope="col"> <i class="fa-solid fa-sort-up " onClick={this.handleratingdec} ></i> Rating <i class="fa-solid fa-sort-down" onClick={this.handleratinginc} ></i> </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterarr.map((n) => {
                                        return (
                                            <tr>
                                                <th><img style={{width:'5rem' , height : '4rem'} } src={`https://image.tmdb.org/t/p/original${n.backdrop_path}`} /></th>
                                                <th scope="row">  {n.title}</th>
                                                <td>{genreids[n.genre_ids[0]]}</td>
                                                <td>{n.popularity}</td>
                                                <td>{n.vote_average}</td>
                                                <td><button type="button" class="btn btn-outline-danger" style={{width : '4vw' , fontSize:'12px', padding:'5px'  }}  
                                                onClick={()=>this.handledelete(n.id)} >Delete</button></td>
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