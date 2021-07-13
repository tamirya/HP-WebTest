import React from "react";
import {useSelector } from "react-redux";
import Error from "components/Error";
import AlbumsGridWithSearch from "components/AlbumsGridWithSearch";

const Home = () => {
  // get error
  const error = useSelector((state) => state.search.error);

  return (
    <div className="container">
      {/* if error it will display here */}
      {error && <Error msg={error} />}
      <AlbumsGridWithSearch />
    </div>
  );
};

export default Home;
