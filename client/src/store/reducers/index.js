import { searchReducer as search } from "./searchReducer";
import { combineReducers } from "redux";

// combine all reducers
const allReducers = combineReducers({ search });

export default allReducers;
