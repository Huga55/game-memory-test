import React, {useEffect} from "react";
import Router from "../router/Router";
import {useDispatch} from "react-redux";
import {setResultsAC} from "../redux/reducers/gameReducer";

const MainLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const resultsStorage = localStorage.getItem("results");
        if(resultsStorage) dispatch(setResultsAC(JSON.parse(resultsStorage)));
    }, []);

    return(
        <div className="section">
            <header className="header">
                <div className="container">
                    <div className="header__title">
                        Игра "Память"
                    </div>
                </div>
            </header>
            <div className="container">
                <Router />
            </div>
        </div>
    );
}

export default MainLayout;
