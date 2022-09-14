import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers } from "redux";
import keepAlive from "../keep-alive/store/cacheReducer";

const store = legacy_createStore(combineReducers({keepAlive}), composeWithDevTools())

export default store