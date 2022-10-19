import React from "react";
import { Link } from "react-router-dom";



function Navbar() {

  return (
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
          <Link to="/" ><h2 style={{}}>Popular</h2></Link>
          < Link to="/TopRated" ><h2 >Top Rated</h2></Link>
          < Link to="/mostrecent" ><h2 >Most Recent</h2></Link>
          < Link to="/favorites" ><h2 >favorites</h2></Link>
        </div>
        

        <div style={{width:'40%'}} >
        <div class="wrap">
          <div class="search">
            <input type="text" class="searchTerm" placeholder="Search any movie here..." />
              <button type="submit" class="searchButton">
                <i class="fa fa-search"></i>
              </button>
          </div>
        </div>
        </div>

      </div>
    </div>
  );

}

export default Navbar;

