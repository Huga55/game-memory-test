import React from "react";
import style from "./TableRow.module.css";
import moment from "moment";
import {getTimeFromSeconds} from "../../utils/time";

interface IProps {
    index: number | string;
    name: string;
    time: string | number;
    date: string;
    isHead?: boolean;
    isOwn?: boolean;
}

const TableRow: React.FC<IProps> = ({ index, name, time, date, isHead, isOwn }) => {
    return(
        <div className={`${style.row}`}>
            <span className={`${style.numb} ${style.cell} ${isOwn && style.cell_active}`}>{index}</span>
            <span className={`${style.date} ${style.cell}`}>{isHead? date : moment(date).format("DD.MM.YYYY")}</span>
            <span className={`${style.name} ${style.cell}`}>{name}</span>
            <span className={`${style.time} ${style.cell}`}>{isHead? time : getTimeFromSeconds(Number(time))}</span>
        </div>
    );
}

export default TableRow;
