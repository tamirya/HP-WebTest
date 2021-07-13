import axios from "axios";

/**
 * The store actions
 */
export const getSearch = () => {
  return (dispatch, getState) => {
    dispatch(getSearchStarted());
    // make a request to server 
    axios
      .get(`/search`)
      .then((res) => {
        // set data 
        dispatch(getSearchSuccess(res.data));
      })
      .catch((err) => {
        // set error
        dispatch(getSearchFailure(err.message));
      });
  };
};

// define search started
const getSearchStarted = () => ({
  type: "GET_SEARCH_STARTED",
});

// define search success
const getSearchSuccess = (data) => ({
  type: "GET_SEARCH_SUCCESS",
  payload: data
});

// define search failure
const getSearchFailure = (error) => ({
  type: "GET_SEARCH_FAILURE",
  payload: {
    error
  },
});