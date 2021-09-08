import React from "react";
import style from "./Button.module.css";

interface IProps {
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<IProps> = ({ children, className , onClick}) => {
    return(
        <button className={`${style.button} ${className || ""}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
