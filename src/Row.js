import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log("inside useeffect");
      console.log("row response", request);
      setMovies(request.data.results);
      console.log("rowmovues", movies);
      return request;
    }

    fetchData();
  }, [fetchUrl]);
  const imgClick = (movie) => {
    if (trailerUrl) {
      console.log("empty url");
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.source)
        .then((url) => {
          console.log("url", url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log("urlParams", urlParams);
          setTrailerUrl(urlParams.get("v"));

          console.log("filter", trailerUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="row">
      {console.log("return")}
      {console.log("trailerUrl", trailerUrl)}
      {console.log("return", movies)}
      <h2 className="typetitle">{title}</h2>
      <div className="row_posters_master">
        <div className="row_posters">
          {movies.map((movie) => {
            return (
              <img
                key={movie.id}
                onClick={() => imgClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${baseURL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={`${movie.title}`}
              ></img>
            );
          })}
        </div>
      </div>
      <div className="video">
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
      </div>
    </div>
  );
}
export default Row;
