import React, {useEffect, useState} from "react";
import style from "./GamePage.module.css";
import Card from "../../components/Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {
    addResultAC,
    hideCardAC,
    removeCardAC,
    ResultsType,
    setCardsAC,
    showCardAC
} from "../../redux/reducers/gameReducer";
import {cardsArr} from "../../constants/contsants";
import {AppStateType} from "../../redux/store";
import Button from "../../components/Button/Button";
import {getTimeFromSeconds} from "../../utils/time";
import {useHistory} from "react-router-dom";

const GamePage = () => {
    const [showCardTimerId, setShowCardTimerId] = useState<null | ReturnType<typeof setTimeout>>(null);
    const [showedCards, setShowedCards] = useState<Array<{ id: number, pairId: number }>>([]);
    const [isGame, setIsGame] = useState<boolean>(false);
    const [timeGame, setTimeGame] = useState<{ id: null | ReturnType<typeof setTimeout>, seconds: number }>({
        id: null,
        seconds: 0
    });
    const [showAllCards, setShowAllCards] = useState<boolean>(false);

    const {cards, countCards} = useSelector((state: AppStateType) => state.game);
    const {id, name} = useSelector((state: AppStateType) => state.user);

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if(!id) {
            history.push("/");
        }else {
            dispatch(setCardsAC(shuffle(JSON.parse(JSON.stringify(cardsArr)))));
        }
    }, []);

    useEffect(() => {
        if (showedCards.length === 2) {
            if (showedCards[0].pairId === showedCards[1].pairId) {
                setTimeout(() => {
                    dispatch(removeCardAC(showedCards[0].pairId));
                    setShowedCards([]);
                }, 1000);
            } else {
                setTimeout(() => {
                    dispatch(hideCardAC(showedCards[0].id));
                    dispatch(hideCardAC(showedCards[1].id));
                    setShowedCards([]);
                }, 1000);
            }
        }
    }, [showedCards]);

    useEffect(() => {
        isGame ? startGame() : clearTimeout(Number(timeGame.id));
    }, [isGame]);

    useEffect(() => {
        if (!countCards && isGame) stopGame();
    }, [countCards]);

    const startGame = () => {
        const timerId = setTimeout(() => {
            startGame();
        }, 1000);

        setTimeGame({
            id: timerId,
            seconds: timeGame.seconds++
        });
    }

    const stopGame = () => {
        setIsGame(false);
        const result = {id, name, time: timeGame.seconds, date: new Date().toString()};
        dispatch(addResultAC(result));

        saveToStorage(result);
    }

    const chooseCard = (id: number, pairId: number) => {
        if (showedCards.length > 1 || !isGame) return;

        dispatch(showCardAC(id));
        setShowedCards([...showedCards, {id, pairId}]);

        if (showedCards.length === 1 && showCardTimerId) {
            clearInterval(showCardTimerId);
            return;
        }

        const timer = setTimeout(() => {
            dispatch(hideCardAC(id));
            setShowedCards([]);
        }, 5000);
        setShowCardTimerId(timer);
    }

    const windowButtonClick = () => {
        if(timeGame.seconds) {
            return history.push("/result");
        }

        setShowAllCards(true);

        setTimeout(() => {
            setShowAllCards(false);
            setIsGame(true);
        }, 2000);
    }

    const saveToStorage = (result: ResultsType) => {
        const JSONStorage = localStorage.getItem("results");
        const resultsStorage = JSONStorage && JSON.parse(JSONStorage)
        const newResultStorage = JSON.stringify(resultsStorage? [...resultsStorage, result] : [result]);
        localStorage.setItem("results", newResultStorage);
    }

    const shuffle = (arr: Array<any>) => {
        return arr.sort(() => Math.round(Math.random() * 100) - 50);
    }

    return (
        <div className={style.wrapper}>
            <div className={`${style.window} ${!isGame && !showAllCards && style.window_active}`}>
                <div className={style.title}>
                    {
                        timeGame.seconds ?
                            `Игра окончена! Ваш результат: ${getTimeFromSeconds(timeGame.seconds)}`
                            :
                            "В этой игре нужно открывать карты и искать парные. За раз можно открыть только 2 карты. После чего они закроются. " +
                            "После открытия первой карты у Вас будет 5 секунд для открытие второй."
                    }

                </div>
                <Button className={style.button}
                        onClick={windowButtonClick}>{timeGame.seconds ? "Ок" : "Начать игру"}</Button>
            </div>
            <div className={style.time}>
                Время: {timeGame.seconds ? getTimeFromSeconds(timeGame.seconds) : "00:00:00"}
            </div>
            <div className={style.cards}>
                {cards?.map((c) => <Card {...c} key={c.id} showAll={showAllCards} onClick={() => chooseCard(c.id, c.pairId)}/>)}
            </div>
        </div>
    );
}

export default GamePage;
