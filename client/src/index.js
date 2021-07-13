import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import allReducers from "./store/reducers";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
// axios define the base url
axios.defaults.baseURL = "http://localhost:8080";
// define the store with middleware
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// create store
const store = createStore(allReducers, composedEnhancer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
