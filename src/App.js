import "./App.css";
import { getMovieList, seacrhMovie } from "./Api.js";
import { useEffect, useState } from "react";
const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PolularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt=".."
            className="Movie-image"
          />
          <div className="Movie-date">Release : {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  // console.log({ popularMovies: popularMovies });

  const seacrh = async (q) => {
    if (q.length > 3) {
      const query = await seacrhMovie(q);
      setPopularMovies(query.results);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tiptop-Mov</h1>
        <input
          type="text"
          placeholder="Cari Film Anda.."
          className="Movie-search"
          onChange={({ target }) => seacrh(target.value)}
        />
        <div className="Movie-container">
          <PolularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
