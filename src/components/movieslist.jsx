import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/movieslist.css";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const [companyname, setCompanynane] = useState("");
  const [Address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const apiUrl = "https://hoblist.com/api/movieList";

  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl, {
        category: "movies",
        language: "kannada",
        genre: "all",
        sort: "voting",
      });

      setMovieData(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleClick = () => {
    setCompanynane(" Geeksynergy Technologies Pvt Ltd");
    setAddress("Sanjayanagar, Bengaluru-56");
    setPhone("XXXXXXXXX09");
    setEmail("XXXXXX@gmail.com");
  };
  useEffect(() => {
    fetchData();
  }, []);
  const finaldata = movieData.map((movie, index) => (
    <li key={index} className="movie-item">
      <div className="icons-column">
        <TiArrowSortedUp size={60} className="up-arrow" />
        <p>{1}</p>
        <TiArrowSortedDown size={60} className="down-arrow" />
        <p className="votes">Votes</p>
      </div>
      <div className="image-column">
        <img
          src={movie.poster}
          alt={movie.title}
          className="rounded-md h-60 w-46"
        />
      </div>
      <div className="details-column">
        <p>Name: {movie.title}</p>
        <p>Genre: {movie.genre}</p>
        <p>Director: {movie.director}</p>
        <p>Starring: {movie.stars}</p>
        <span>
          <p>
            Mins | {movie.language} |{formatDate(movie.releasedDate)}
          </p>
        </span>
        <p className="blue-text">
          {movie.pageViews} views|
          <span>Votes</span> voted by <span>1 people</span>
        </p>
        <button className="button-watch">Watch Trailer</button>
      </div>
    </li>
  ));

  return (
    <div>
      <div className="info-div">
        <h2>GEEKSYNERGY</h2>
        <button onClick={handleClick} className="info-button">
          Company info
        </button>
        <div className="company-info-container">
          <p style={{ color: "white" }}>{companyname}</p>
          <p style={{ color: "white" }}>{Address}</p>
          <p style={{ color: "white" }}>{phone}</p>
          <p style={{ color: "white" }}>{email}</p>
        </div>
      </div>
      {movieData && movieData.length === 0 ? (
        <div className="loader"></div>
      ) : (
        <ul className="movie-list">{finaldata}</ul>
      )}
    </div>
  );
};

export default MovieList;
