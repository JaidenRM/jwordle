import { FC, useEffect, useState } from "react";
import { useBoardRowState } from "../../@hooks/useBoardRowState";
import { KeyHelper } from "../../utils/helpers/key";
import { StringHelper } from "../../utils/helpers/string";
import { TileRow } from "../TileRow";

interface BoardProps {
    word: string
    attempts: number
}

export const Board: FC<BoardProps> = ({ word, attempts }) => {
    const [rowDict, setRow] = useBoardRowState(word.length, attempts);
    const [activeRow, setActiveRow] = useState(0);

    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            var trimmedWord = rowDict[activeRow].trim();
            if (ev.key === KeyHelper.ENTER && trimmedWord.length === word.length) {
                if (activeRow >= attempts) return; //we failed

                // TODO: check if guess is right
                setActiveRow(prev => prev + 1);
            } else if (ev.key === KeyHelper.BACKSPACE) {
                setRow(StringHelper.removeLastChar(trimmedWord), activeRow);
            } else if (KeyHelper.isAlphaKey(ev.key)) {
                setRow(trimmedWord + ev.key, activeRow);
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [activeRow, rowDict, attempts, word.length]);

    return (
        <div>
            { [...Array(attempts)].map((val, ind) => <TileRow key={ind} rowLength={word.length} rowWord={rowDict[ind]} />) }
        </div>
    );
}