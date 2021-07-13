import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearch } from "store/actions/searchAction";

//  Albums Grid With Search component
const AlbumsGridWithSearch = () => {
  // dispatch actions
  const dispatch = useDispatch();
  // get the albums from store
  const albums = useSelector((state) => state.search.data);
  // set the filterd albums
  const [albumsFilterd,setAlbumsFiltered] = useState([]);
  // query for search
  const [query, setQuery] = useState("");

  useEffect(()=>{
    // get albums from api
    dispatch(getSearch())
  },[]);

  useEffect(()=>{
    // set the albums filterd with the albums fetched from api
    setAlbumsFiltered(albums);
  },[albums]);

  useEffect(()=>{
    // if no query, set all albums
    if(query === ""){
        setAlbumsFiltered(albums);
        return;  
    }

    // filter albums by search query
    const filterAlbums = albumsFilterd.filter( album => album.collectionName.toLowerCase().includes(query) );
    setAlbumsFiltered(filterAlbums);
  },[query]);

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-12">
          <div className="form-group">
              <label>Please Type Your Search</label>
              <input
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                required
                className="form-control"
                placeholder="Search Albums"
              />
            </div>
        </div>
      </div>
      <div className="row">
        {albumsFilterd.map((album, i) => (
            <div key={i} className="col-auto mb-5">
                    <div className="card album-item">
                            <img className="card-img-top" src={album.artworkUrl60} alt="Card image cap" />
                            <div className="card-body">
                            <h5 className="card-title">{album.collectionName}</h5>
                            <p className="card-text">Genre: {album.primaryGenreName}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
  );
};

export default AlbumsGridWithSearch;
