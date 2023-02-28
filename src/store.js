import {legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import  {rootReducer}  from "./reducers";

export const store = createStore (rootReducer, compose(applyMiddleware(thunk)));