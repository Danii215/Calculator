import style from "./Calculator.module.scss";

export function Calculator() {
    return (
        <>
            <div className={style.screen} data-theme="dark">
                399,981
            </div>
            <main className={style.keypad} data-theme="dark">
                <button className={style.keypad__button}>
                    <span>7</span>
                </button>
                <button className={style.keypad__button}>
                    <span>8</span>
                </button>
                <button className={style.keypad__button}>
                    <span>9</span>
                </button>
                <button
                    className={[
                        style["keypad__button--blue"],
                        style.keypad__button,
                    ].join(" ")}
                >
                    <span>DEL</span>
                </button>
                <button className={style.keypad__button}>
                    <span>4</span>
                </button>
                <button className={style.keypad__button}>
                    <span>5</span>
                </button>
                <button className={style.keypad__button}>
                    <span>6</span>
                </button>
                <button className={style.keypad__button}>
                    <span>+</span>
                </button>
                <button className={style.keypad__button}>
                    <span>1</span>
                </button>
                <button className={style.keypad__button}>
                    <span>2</span>
                </button>
                <button className={style.keypad__button}>
                    <span>3</span>
                </button>
                <button className={style.keypad__button}>
                    <span>-</span>
                </button>
                <button className={style.keypad__button}>
                    <span>.</span>
                </button>
                <button className={style.keypad__button}>
                    <span>0</span>
                </button>
                <button className={style.keypad__button}>
                    <span>/</span>
                </button>
                <button className={style.keypad__button}>
                    <span>x</span>
                </button>
                <button
                    className={[
                        style["keypad__button--blue"],
                        style["keypad__button--reset"],
                        style.keypad__button,
                    ].join(" ")}
                >
                    <span>RESET</span>
                </button>
                <button
                    className={[
                        style["keypad__button--equals"],
                        style.keypad__button,
                    ].join(" ")}
                >
                    <span>=</span>
                </button>
            </main>
        </>
    );
}
