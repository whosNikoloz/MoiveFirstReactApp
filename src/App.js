import './App.css';
import { useEffect, useState } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = "http://www.omdbapi.com?apikey=74207209";


function App() {
  const [movies, SetMovies] = useState();  
  const [searchTerm, setSearchTerm] = useState();

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    SetMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('spiderman');
  }, []);

  return (
    <div className='app'>
      <h1>MovieReact</h1>

      <div className='search'>
        <input 
          placeholder='Search for movies' 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)}></img>

      </div>

      {
        movies?.length > 0
          ?(
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard obj={movie} />
              ))}
            </div>
          ) :
          (
            <div className='empty'>
              <h2>No Movies Found</h2>
            </div>
          )
      }
    </div>
  );
}

export default App;
