import './App.css'
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Movielist from "./components/Movielist";
import Favorites from "./components/favorites";
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (

    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<> <Banner /> <Movielist /> </>} />

        <Route path="/favorites" element= {<Favorites />} />

        </Routes>
        
    </BrowserRouter>

  );
}

export default App;

//photo adress for tmdb api https://image.tmdb.org/t/p/original
// tmdb api adress https://api.themoviedb.org/3/movie/popular?api_key=588cdf9715348dda0561ce854dcbc4ac&language=en-US&page=1



