import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import noresult from './noresults.jpg';
import Trailer from "./Trailer";
import MovieID from "./Trailer";

function Navbar() {

  const [content, setcontent] = useState('');
  const [open, setOpen] = useState(false);
  const [result, setresult] = useState([])


  const navigate = useNavigate();

  const handleContent = async () => {

    await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US&query=${content}&page=1&include_adult=true`).then(res => {
      // console.log(res.data.results);

      let data = res.data.results;
      setresult(data)
      console.log(result);
    }).catch(err => {
      console.log(err);
    })

    setOpen(true);
  }


  const handleClickAway = () => {
    setOpen(false);
    setcontent('')
  };

  const navigatedetail = (id) => {

    // setid(id);
    // <MovieID ID={id} />
    localStorage.setItem('movie-Id', id)
    setOpen(false);
    // navigate('/detail')
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className="navbar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-evenly',
            fontStyle: "italic",
            marginTop: "0vh",
            width: '100%'

          }}
        >
          <div style={{ display: 'flex', width: '40%', justifyContent: 'space-evenly', alignContent: 'center' }} >
            <Link to="/" ><h4 style={{}}>Popular</h4></Link>
            < Link to="/TopRated" ><h4 >Top Rated</h4></Link>
            < Link to="/mostrecent" ><h4 >Most Recent</h4></Link>
            < Link to="/favorites" ><h4 >favorites</h4></Link>
            {/* <Link to='/detail' ></Link> */}
          </div>


          <div style={{ width: '40%' }} >
            <div class="wrap">
              <div class="search">
                <input type="text" value={content} onChange={(e) => setcontent(e.target.value)} class="searchTerm" placeholder="Search any movie here..." />
                <button type="submit" class="searchButton">
                  <i class="fa fa-search" onClick={() => handleContent()}></i>
                </button>
              </div>
            </div>
            {open && (
              <div className="results" >
                {result.length != 0 ? 
                <>
                  {result?.map((n) =>
                    <Link to='/detail' >
                      <div className="resultindi" onClick={() => navigatedetail(n.id)} >
                        <img className="serchimg" src={`https://image.tmdb.org/t/p/w500${n.poster_path}`} />
                        <div className="resultdetail"   >
                          <h5>{n.original_title}</h5>
                          <h5>{n.release_date}</h5>
                          <h5> <StarIcon /> {n.vote_average} </h5>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
                  : <img className="noresultimg" src={noresult} />}
              </div>
            )}

          </div>

        </div>
      </div>
    </ClickAwayListener>
  );

}

export default Navbar;

