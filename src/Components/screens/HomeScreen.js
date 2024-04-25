import React from "react";
import Banner from "../pages/Banner";
import Nav from "../pages/Nav";
import requests from "../../Requests";
import Row from "../pages/Row";
import Footer from "../pages/Footer";
function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Nav />
      <Banner />
      <Row Categorytitle='NETFLIX ORIGINALS' fetchURL={requests.fetchNetflixOriginals} isLargeRow />
      <Row Categorytitle='Top Rated' fetchURL={requests.fetchTopRated} />
      <Row Categorytitle='Trending Now' fetchURL={requests.fetchTrending} />
      <Row Categorytitle='Action Movies' fetchURL={requests.fetchActionMovies} />
      <Row Categorytitle='Comedy Movies' fetchURL={requests.fetchComedyMovies} />
      <Row Categorytitle='Horror Movies' fetchURL={requests.fetchHorrorMovies} />
      <Row Categorytitle='Romance Movies' fetchURL={requests.fetchRomanceMovies} />
      <Row Categorytitle='Documentaries' fetchURL={requests.fetchDocumentaries} />
      <Footer />
    </div>
  );
}
export default HomeScreen;
