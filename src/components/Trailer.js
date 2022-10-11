import React,{useState , useEffect} from 'react'
import axios from 'axios';

function Trailer() {

    const [ID , setid ] = useState("642885");


    useEffect(()=> {
        axios.get(`https://api.themoviedb.org/3/movie/${ID}?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US`).then(response=>{
            console.log(response.data)
        }).catch(err=>{
            console.log(err);
        })
    },[ID])



    return (
        <div>

            <div className='detailmain' >
            
                <div className='moviedetail' >
                    <div className='detail-name' ></div>
                    <div className='detail-ratings' ></div>
                </div>
            
                <div className='poster' ></div>
            
                <div className='trailervideo ' ></div>
            
                <div className='grouper' >
                    <div className = 'videogrouper' ></div>
                    <div className = 'photosgrouper' ></div>
                </div>

            </div>

        </div>
    )
}

export default Trailer