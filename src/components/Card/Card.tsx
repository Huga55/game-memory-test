import React from "react";
import style from "./Card.module.css";

interface IProps {
    id: number;
    img: string;
    isShow: boolean;
    isNeed: boolean;
    onClick: () => void;
    showAll: boolean;
}

const Card: React.FC<IProps> = ({ img, isShow, isNeed, onClick, showAll }) => {
    const imgPath = require(`./../../img/cards/${img}`);
    return(
        <div className={`${style.wrapper} ${(isShow || showAll) && style.wrapper_active}`} onClick={onClick}>
            {isNeed &&
            <div className={style.card}>
                <img src={imgPath.default} alt="icon" className={style.img}/>
            </div>}
        </div>
    );
}

export default Card;
