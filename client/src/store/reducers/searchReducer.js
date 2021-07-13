// set the initial state
const initialState = {
  loading: false,
  data: [],
  error: null,
};

// search reducer
export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SEARCH_STARTED":
      return {
        ...state,
        loading: true,
      };
    case "GET_SEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        data: [...action.payload]
      };
    case "GET_SEARCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
