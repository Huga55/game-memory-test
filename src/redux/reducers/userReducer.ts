const SET_NAME = "SET_NAME";


const initialState = {
    id: "",
    name: "",
}

type InitialStateType = typeof initialState;

const UserReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_NAME":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionTypes = SetUserACType;

type SetUserACType = {
    type: typeof SET_NAME;
    payload: {
        id: string;
        name: string;
    };
}

export const setUserAC = (id: string, name: string): SetUserACType => ({ type: SET_NAME, payload: {id, name} })

export default UserReducer;
