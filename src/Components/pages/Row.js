import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "../../assests/styles/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
import Loader from "../common/Loading";
import numeral from "numeral";
function Row({ Categorytitle, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = React.useState([]);
  const [trailerPath, setTrailerPath] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [original_title, setOriginal_title] = React.useState("");
  const [loading, setLoading] = useState(false);
  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      modestbranding: 1,
      controls: 0,
    },
  };
  const handleClick = (movie) => {
    setLoading(true);
    if (trailerPath === "") {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || movie?.original_title)
        .then((response) => {
          const path = response.split("?v=")[1];
          setTrailerPath(path);
          document.querySelector("body").style.overflow = "hidden";
          setDescription(movie?.overview);
          setTitle(movie?.name || movie?.title);
          setOriginal_title(movie?.original_name);
          setLoading(false);
        })
        .catch((error) => {
          handleError();
          setLoading(false);
          console.log(error);
        });
    } else {
      setTrailerPath("");
      setDescription("");
      setTitle("");
      setOriginal_title("");
      document.querySelector("body").style.overflow = "auto";
      setLoading(false);
    }
  };
  const handlehover = (movie) => {
    if (trailerPath === "") {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || movie?.original_title)
        .then(() => {
          setDescription(movie?.overview);
          setTitle(movie?.name || movie?.title);
          setOriginal_title(movie?.original_name);
        })
        .catch((error) => {
          handleError();
          console.log(error);
        });
    } else {
      setTrailerPath("");
      setDescription("");
      setTitle("");
      setOriginal_title("");
    }
  };
  const truncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  };
  return (
    <div className='row'>
      <h2>{Categorytitle}</h2>
      <div className='row_posters'>
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
              <div
                className='result-banner'
                onClick={() => handleClick(movie)}
                onMouseOver={() => handlehover(movie)}
                onTouchStart={() => handlehover(movie)}>
                <img
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  key={movie.id}
                  src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name}
                />
                <div
                  className={`row_poster result-details-small ${
                    isLargeRow && "row_posterLarge result-details-large"
                  }`}>
                  <h3 className='result-title'>{title}</h3>
                  <p className='result-description'>{truncate(description, 150)}</p>
                  <div className='list__rating'>
                    <Rating
                      name='movie-rating'
                      className='movieRating'
                      value={movie.vote_average / 2 || 0}
                      precision={0.5}
                      icon={<StarRoundedIcon fontSize='inherit' readOnly />}
                    />
                    <small className='list__likes'>
                      {numeral(movie.vote_average / 2).format("0.0")}
                    </small>
                  </div>
                </div>
              </div>
            )
        )}
        {loading ? <Loader /> : null};
      </div>
      {trailerPath && (
        <div className='info__overlay' onClick={() => handleClick(null)}>
          <div className='info__overlay--contentBox'>
            <span
              onClick={() => handleClick(null)}
              className='info__overlay--btnClose fa-stack fa-2x'>
              <i className='fas fa-circle fa-stack-2x icon-black'></i>
              <i className='fas fa-times fa-stack-1x icon-white'></i>
            </span>
            <div className='info__overlay--videoBox'>
              <YouTube className='info__overlay--youtube video' videoId={trailerPath} opts={opts} />
              <div className='info__overlay--iconBox'>
                <button className='info__button info__button--play'>
                  <i className='fas fa-play'></i>
                  <span>Play</span>
                </button>
                <span className='fa-stack fa-2x info__icon'>
                  <i className='fas fa-circle fa-stack-2x icon-black-opacity'></i>
                  <i className='fas fa-plus fa-stack-1x icon-white'></i>
                </span>
                <span className='fa-stack fa-2x info__icon'>
                  <i className='fas fa-circle fa-stack-2x icon-black-opacity'></i>
                  <i className='far fa-thumbs-up fa-stack-1x icon-white'></i>
                </span>
                <span className='fa-stack fa-2x info__icon'>
                  <i className='fas fa-circle fa-stack-2x icon-black-opacity'></i>
                  <i className='far fa-thumbs-down fa-stack-1x icon-white'></i>
                </span>
              </div>
            </div>
            <div className='info__overlay--text'>
              <h1>{title}</h1>
              <h2>{original_title ? `(${original_title})` : ""}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export const handleError = function () {
  const html = `
    <div class="error">
        <div class="error__text">
            <p class="error__heading">Error:</p>
            <p class="error__description">Can't find trailer, please try another title!</p>
        </div>
    </div>
    `;
  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", html);
  const error = body.querySelector(".error");
  error.classList.add("fade-in");

  setTimeout(function () {
    // error.classList.remove('fade-in');
    error.classList.add("fade-out");
    setTimeout(function () {
      error.remove();
    }, 500);
  }, 2500);
};
export default Row;
