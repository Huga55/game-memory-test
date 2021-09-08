import React from "react";
import { Switch, Route } from "react-router-dom";
import StartPage from "../pages/Start/StartPage";
import GamePage from "../pages/Game/GamePage";
import ResultPage from "../pages/Result/ResultPage";

const Router = () => {
    return(
        <Switch>
            <Route path="/" exact>
                <StartPage />
            </Route>
            <Route path="/game">
                <GamePage />
            </Route>
            <Route path="/result">
                <ResultPage />
            </Route>
        </Switch>
    );
}

export default Router;
