import { useState, useEffect } from "react";
import {
    putSymbol,
    removeSymbol,
    solveExpression,
    separateExpressions,
    separators,
    validCharacters,
} from "@/assets/inc/functions";
import style from "./Calculator.module.scss";
import { Button } from "../index";

export function Calculator() {
    const [screen, setScreen] = useState("0");
    const [preview, setPreview] = useState("");
    const [success, setSuccess] = useState(false);

    // Calculator's buttons.
    const buttons = [
        { buttonData: { character: "7", onClick: () => handleClick("7") } },
        { buttonData: { character: "8", onClick: () => handleClick("8") } },
        { buttonData: { character: "9", onClick: () => handleClick("9") } },
        {
            buttonData: {
                character: "DEL",
                onClick: () => handleClick("DEL"),
                specification: "blue" as const,
            },
        },
        { buttonData: { character: "4", onClick: () => handleClick("4") } },
        { buttonData: { character: "5", onClick: () => handleClick("5") } },
        { buttonData: { character: "6", onClick: () => handleClick("6") } },
        { buttonData: { character: "+", onClick: () => handleClick("+") } },
        { buttonData: { character: "1", onClick: () => handleClick("1") } },
        { buttonData: { character: "2", onClick: () => handleClick("2") } },
        { buttonData: { character: "3", onClick: () => handleClick("3") } },
        { buttonData: { character: "-", onClick: () => handleClick("-") } },
        { buttonData: { character: ".", onClick: () => handleClick(".") } },
        { buttonData: { character: "0", onClick: () => handleClick("0") } },
        { buttonData: { character: "/", onClick: () => handleClick("/") } },
        { buttonData: { character: "x", onClick: () => handleClick("x") } },
        {
            buttonData: {
                character: "RESET",
                onClick: () => handleClick("RESET"),
                specification: "reset" as const,
            },
        },
        {
            buttonData: {
                character: "=",
                onClick: () => handleClick("="),
                specification: "equals" as const,
            },
        },
    ];

    // Horizontal scroll case the number on screen is too large.
    function horizontalScroll(e: React.WheelEvent<HTMLDivElement>) {
        const container = e.currentTarget;
        const scrollAmount = 100;

        container.scrollLeft += e.deltaY > 0 ? scrollAmount : -scrollAmount;
    }

    // Handle keyboard inputs properly.
    function insertKeyboard(e: React.KeyboardEvent<HTMLDivElement>) {
        let digit: string = e.key;

        switch (e.key) {
            case "Backspace":
                setScreen(removeSymbol(screen));
                break;
            case "Enter":
            case "=":
                setScreen(solveExpression(screen));
                successAnimation();
                break;
            case "*":
                digit = "x";
        }

        for (let i = 0; i < validCharacters.length; i++) {
            if (digit === validCharacters[i]) {
                setScreen(putSymbol(screen, digit));
            }
        }
    }

    // What happens when you click calculator's buttons.
    function handleClick(value: string) {
        if (value === "DEL") {
            setScreen(removeSymbol(screen));
            return;
        }
        if (value === "RESET") {
            setScreen("0");
            return;
        }
        if (value === "=") {
            setScreen(solveExpression(screen));
            successAnimation();
            return;
        }
        setScreen(putSymbol(screen, value));
    }

    // Plays little animation when the operation is complete.
    function successAnimation() {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 100);
    }

    // Controls what the preview is displaying. It shouldn't appear
    // when its exactly equal to what the screen is showing, or
    // the operation is still not complete.
    if (preview === screen) setPreview("");
    useEffect(() => {
        if (preview === screen) {
            setPreview("");
            return;
        }
        const expressions: string[] = separateExpressions(screen);
        for (let i = 0; i < separators.length; i++) {
            if (expressions[expressions.length - 1] === separators[i]) {
                setPreview("");
                return;
            }
        }
        if (expressions.length > 2) {
            setPreview(solveExpression(screen));
            return;
        }
    }, [screen]);

    return (
        <>
            <div
                onWheel={e => horizontalScroll(e)}
                onKeyDown={e => insertKeyboard(e)}
                tabIndex={0}
                className={style.screen}
                data-theme="dark"
            >
                <span>{preview}</span>
                <p data-success={success}>{screen}</p>
            </div>
            <main className={style.keypad} data-theme="dark">
                {buttons.map((button, index) => (
                    <Button key={index} buttonData={button.buttonData} />
                ))}
            </main>
        </>
    );
}
