import { ButtonProps } from "@/assets/inc/functions";
import style from "./Button.module.scss";
import { useState } from "react";

export function Button({ buttonData }: ButtonProps) {
    const { character, onClick, specification } = buttonData;
    const [active, setActive] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter") {
            setActive(true);
        }
    };

    let buttonClassName = style.button;
    if (specification === "reset") {
        buttonClassName = `${style.button} ${style["button--blue"]} ${style["button--reset"]}`;
    } else if (specification === "blue") {
        buttonClassName = `${style.button} ${style["button--blue"]}`;
    } else if (specification === "equals") {
        buttonClassName = `${style.button} ${style["button--equals"]}`;
    }

    return (
        <button
            onClick={onClick}
            className={buttonClassName}
            data-theme="dark"
            data-active={active}
            onKeyDown={e => handleKeyDown(e)}
            onKeyUp={() => setActive(false)}
        >
            <span>{character}</span>
        </button>
    );
}
