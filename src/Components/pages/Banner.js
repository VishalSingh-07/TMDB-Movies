import React, { useEffect ,useState} from "react";
import "../../assests/styles/Banner.css";
import axios from "../../axios";
import requests from "../../Requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import Rating from "@material-ui/lab/Rating";
function Banner({ fetchURL }) {
  const [movie, setMovie] = useState([]);
  const [rating, setRating] = useState([]);
  const [trailerPath, setTrailerPath] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [original_title, setOriginal_title] = useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    }
    fetchData();
  }, []);
  function truncate(string, n) {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  }
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setRating(request.data.results);
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
    if (trailerPath === "") {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || movie?.original_title)
        .then((response) => {
          const path = response.split("?v=")[1];
          setTrailerPath(path);
          document.querySelector("body").style.overflow = "hidden";
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
      document.querySelector("body").style.overflow = "auto";
    }
  };

  return (
    <header
      className='banner'
      style={{
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}>
      <div className='bannerScreen_gradient'></div>
      <div className='banner_contents'>
        <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
        <h1 className='banner_description'>{truncate(movie?.overview, 250)}</h1>
        <div className='list__rating'>
          <Rating
            name='movie-rating'
            className='movieRating'
            value={movie.vote_average / 2 || 0}
            precision={0.5}
            icon={<StarRoundedIcon fontSize='inherit' readOnly />}
          />
          <small className='list__likes'>{movie.vote_average / 2}</small>
        </div>
        <div className='banner_buttons'>
          <button className='banner_button play' onClick={() => handleClick(movie)}>
            {" "}
            <i class='fa-solid fa-play icon'></i>Play
          </button>
          <button className='banner_button'>
            <i class='fa-solid fa-plus icon'></i>My List
          </button>
        </div>
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
    </header>
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

export default Banner;
