import {combineReducers, createStore} from "redux";
import UserReducer from "./reducers/userReducer";
import GameReducer from "./reducers/gameReducer";

const rootReducer = combineReducers({
    user: UserReducer,
    game: GameReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const initialState = {};

const store = createStore(rootReducer, initialState);

export default store;
