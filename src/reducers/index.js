import { combineReducers } from "redux";
import {reducer} from './posts';
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
    posts: reducer,
    auth: authReducer,
})