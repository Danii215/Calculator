import { useState, useEffect } from "react";
import style from "./Header.module.scss";

export function Header() {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme
            ? storedTheme
            : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        const coloredElements = document.querySelectorAll("[data-theme]");
        coloredElements.forEach(element => {
            element.setAttribute("data-theme", theme);
        });
    });

    function changeTheme(event: { target: { value: string } }) {
        const newTheme = event.target.value;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    return (
        <header className={style.header} data-theme="dark">
            <h1>calc</h1>
            <div className={style.header__theme}>
                <h2>THEME</h2>
                <div className={style.header__option}>
                    <span>1</span>
                    <label htmlFor="dark"></label>
                    <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={theme === "dark"}
                        onChange={changeTheme}
                        aria-label="Dark Theme"
                    />
                </div>
                <div className={style.header__option}>
                    <span>2</span>
                    <label htmlFor="light"></label>
                    <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={theme === "light"}
                        onChange={changeTheme}
                        aria-label="Light Theme"
                    />
                </div>
                <div className={style.header__option}>
                    <span>3</span>
                    <label htmlFor="purple"></label>
                    <input
                        type="radio"
                        name="theme"
                        value="purple"
                        checked={theme === "purple"}
                        onChange={changeTheme}
                        aria-label="Purple Theme"
                    />
                </div>
            </div>
        </header>
    );
}
