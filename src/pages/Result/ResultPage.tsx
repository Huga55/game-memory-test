import React from "react";
import style from "./ResultPage.module.css";
import TableRow from "../../components/TableRow/TableRow";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import Button from "../../components/Button/Button";
import { useHistory } from "react-router-dom";

const ResultPage = () => {
    const { results } = useSelector((state: AppStateType) => state.game);
    const { id } = useSelector((state: AppStateType) => state.user)

    const history = useHistory();

    const playAgain = () => {
        history.push("/");
    }

    return(
        <div className={style.wrapper}>
            <Button className={style.button} onClick={playAgain}>Играть еще</Button>
            <div className={style.table}>
                <TableRow index="Номер" name="Ник" time="Затраченное время" date="Дата" isHead  key="id-1"/>
                {results.sort((a, b) => a.time - b.time).map((r, index) =>
                    <TableRow {...r} index={index + 1} isOwn={id === r.id} key={r.id} />)}
            </div>
        </div>
    );
}

export default ResultPage;
