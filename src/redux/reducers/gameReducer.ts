const SET_CARDS = "SET_CARDS";
const SET_RESULTS = "SET_RESULTS";
const ADD_RESULT = "ADD_RESULT";
const SHOW_CARD = "SHOW_CARD";
const HIDE_CARD = "HIDE_CARD";
const REMOVE_CARD = "REMOVE_CARD";

export type CardsType = {
    id: number;
    pairId: number;
    img: string;
    isShow: boolean;
    isNeed: boolean;
}

export type ResultsType = {
    id: string;
    name: string;
    time: number;
    date: string;
}

const initialState = {
    cards: [] as [] | Array<CardsType>,
    results: [] as [] | Array<ResultsType>,
    countCards: 0,
}

type InitialSateType = typeof initialState;

const GameReducer = (state = initialState, action: ActionTypes): InitialSateType => {
    switch (action.type) {
        case "SET_CARDS":
            return {
                ...state,
                ...action.payload,
                countCards: action.payload.cards.length
            }
        case "SET_RESULTS":
            return {
                ...state,
                ...action.payload
            }
        case "ADD_RESULT":
            return {
                ...state,
                results: [...state.results, action.payload.result]
            }
        case "SHOW_CARD":
            return {
                ...state,
                cards: state.cards.map(card => {
                    if(card.id === action.payload.id) {
                        card.isShow = true;
                    }
                    return card;
                }),
            }
        case "HIDE_CARD":
            return {
                ...state,
                cards: state.cards.map(card => {
                    if(card.id === action.payload.id) {
                        card.isShow = false;
                    }
                    return card;
                }),
            }
        case "REMOVE_CARD":
            return {
                ...state,
                cards: state.cards.map(card => {
                    if(card.pairId === action.payload.pairId) {
                        card.isNeed = false;
                    }
                    return card;
                }),
                countCards: state.countCards - 2
            }
        default:
            return state;
    }
}

type ActionTypes = SetCardsACType | SetResultsACType | AddResultACType | ShowCardACType | HideCardACType | RemoveCardACType;

type SetCardsACType = {
    type: typeof SET_CARDS;
    payload: {
        cards: Array<CardsType>
    }
}

export const setCardsAC = (cards: Array<CardsType>): SetCardsACType => ({ type: SET_CARDS, payload: {cards} });

type SetResultsACType = {
    type: typeof SET_RESULTS;
    payload: {
        results: Array<ResultsType>
    }
}

export const setResultsAC = (results: Array<ResultsType>): SetResultsACType => ({ type: SET_RESULTS, payload: {results} });

type AddResultACType = {
    type: typeof ADD_RESULT;
    payload: {
        result: ResultsType;
    }
}

export const addResultAC = (result: ResultsType): AddResultACType => ({ type: ADD_RESULT, payload: {result} });

type ShowCardACType = {
    type: typeof SHOW_CARD;
    payload: {
        id: number;
    }
}

export const showCardAC = (id: number): ShowCardACType => ({ type: SHOW_CARD, payload: {id} });

type HideCardACType = {
    type: typeof HIDE_CARD;
    payload: {
        id: number;
    }
}

export const hideCardAC = (id: number): HideCardACType => ({ type: HIDE_CARD, payload: {id} });

type RemoveCardACType = {
    type: typeof REMOVE_CARD;
    payload: {
        pairId: number;
    }
}

export const removeCardAC = (pairId: number): RemoveCardACType => ({ type: REMOVE_CARD, payload: {pairId} });

export default GameReducer;
