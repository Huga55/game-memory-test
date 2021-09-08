import React, {useState} from "react";
import style from "./StartPage.module.css";
import Button from "../../components/Button/Button";
import {useDispatch} from "react-redux";
import {setUserAC} from "../../redux/reducers/userReducer";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const StartPage = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const history = useHistory();

    const startGame = () => {
        if(!name.trim()) {
            if(error) return;
            setError(true);
            setTimeout(() => setError(false), 3000);
            return;
        }
        dispatch(setUserAC(uuidv4(), name.trim()));
        history.push("/game");
    }

    return(
        <div className={style.wrapper}>
            <form className={style.window} onSubmit={e => e.preventDefault()}>
                <div className={style.title}>Введите Ваше Имя</div>
                <label htmlFor="" className={style.label}>
                    <input
                        type="text"
                        className={style.input}
                        value={name}
                        onInput={(e) => setName(e.currentTarget.value)}
                    />
                    {error && <span className={style.error}>Поле не должно быть пустым</span>}
                </label>
                <Button className={style.button} onClick={startGame}>
                    Начать игру
                </Button>
            </form>
        </div>
    );
}

export default StartPage;
