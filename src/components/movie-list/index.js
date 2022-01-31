import React, { useCallback, useState }  from "react";
import "./index.css";

function MovieList() {

  const [searchInput, setSearchInput] = useState(null);
  const [movieList, setMovieList] = useState([]);

  const getMovies = useCallback((year) => {
    const url = `https://jsonmock.hackerrank.com/api/movies?Year=${year}`
      fetch(url)
        .then(response => response.json())
        .then(data => setMovieList(data.data));
  }, []);

  const onClickSearch = useCallback((e) => {
    e.preventDefault();
    if(searchInput) {
      getMovies(searchInput)
    }
  }, [searchInput, getMovies])

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input value={searchInput || ""} onChange={e => setSearchInput(e.target.value)} min={0} type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input"/>
        <button onClick={onClickSearch} className="" data-testid="submit-button">Search</button>
      </section>
      
      <ul className="mt-50 styled" data-testid="movieList">
        {movieList.map((movie) => <li key={movie.imdbID} className="slide-up-fade-in py-10">{movie.Title}</li>)}
      </ul> 

      {movieList.length > 0 || searchInput === null ? null : (<div className="mt-50 slide-up-fade-in" data-testid="no-result">
        No Results Found
      </div>)}
    </div>
  );
}

export default MovieList