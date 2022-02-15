import { FC } from "react";
import { TileStatus } from "../../@enums/tileStatus";
import { HtmlProps } from "../../@types/html";
import { LetterState } from "../../@types/states/letter";
import { KeyHelper } from "../../utils/helpers/key";
import { Key } from "./key";

interface KeyboardProps extends HtmlProps {
    letterStates?: LetterState[]
}

const findKeyStatus = (targetKey: string, letterStates?: LetterState[]): TileStatus | undefined => {
    if (letterStates) {
        var sortedByStatus = letterStates
            .filter(state => state.letter.toString().toLowerCase() === targetKey.toLowerCase())
            .sort((a, b) => b.status - a.status);
        
        if (sortedByStatus.length) return sortedByStatus[0].status;
    }

    return undefined;
}

const qwertyDict = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
];

export const Keyboard: FC<KeyboardProps> = ({ letterStates, className }) => {
    const keyboardRows: JSX.Element[][] = [];

    qwertyDict.forEach((row, i) => {
        const keyboardRow: JSX.Element[] = [];

        if (i === qwertyDict.length - 1) {
            keyboardRow.push(
                <div className="basis-[15%]" >
                    <Key value={KeyHelper.ENTER} displayValue="✔️" />
                </div>);
        }

        row.forEach((ltr, j) => {
            keyboardRow.push(
                <div className="basis-[10%]" >
                    <Key key={ltr} value={ltr} status={findKeyStatus(ltr, letterStates)} />
                </div>);
        });

        if (i === qwertyDict.length - 1) {
            keyboardRow.push(
                <div className="basis-[15%]" >
                    <Key value={KeyHelper.BACKSPACE} displayValue="❌" />
                </div>);
        }

        keyboardRows.push(keyboardRow);
    });

    return (
        <div className={`flex m-auto ${className}`}>
            <div className="flex flex-wrap justify-center">
                {keyboardRows}
            </div>
        </div>
    );
}