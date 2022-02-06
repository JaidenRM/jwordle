import { FC, useEffect, useMemo, useState } from "react";
import { TileStatus } from "../../@enums/tileStatus";
import { useBoardRowState } from "../../@hooks/useBoardRowState";
import { WordValidator } from "../../@types/words/validator";
import { KeyHelper } from "../../utils/helpers/key";
import { StringHelper } from "../../utils/helpers/string";
import { TileHelper } from "../../utils/helpers/tile";
import { LocalWordValidator } from "../../utils/validators/word/local";
import { TileRow } from "../TileRow";

interface BoardProps {
    word: string
    attempts: number
}

export const Board: FC<BoardProps> = ({ word, attempts }) => {
    const [rowDict, setRow] = useBoardRowState(word.length, attempts);
    const [activeRow, setActiveRow] = useState(0);

    //Using useMemo due to expensive ctor
    const validator: WordValidator = useMemo(() => new LocalWordValidator(word), [word]);

    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            var trimmedWord = TileHelper.toString(rowDict[activeRow]).trim();
            if (ev.key === KeyHelper.ENTER && trimmedWord.length === word.length) {
                if (activeRow >= attempts - 1) {
                    //TODO: improve on
                    alert(`Failed. Word was ${word}`);
                    return;
                }
                if (!validator.isValidWord(trimmedWord)) {
                    //TODO: improve on
                    alert('Not a valid word');
                    return;
                }

                const guessResults = validator.checkGuess(trimmedWord);

                setRow(guessResults, activeRow);
                setActiveRow(prev => prev + 1);

                if (guessResults.every(tile => tile.status === TileStatus.Correct)) alert('You win!'); //TODO: we win
            } else if (ev.key === KeyHelper.BACKSPACE) {
                const shortenedState = TileHelper.fromString(StringHelper.removeLastChar(trimmedWord));
                setRow(shortenedState, activeRow);
            } else if (KeyHelper.isAlphaKey(ev.key)) {
                const expandedState = TileHelper.fromString(trimmedWord + ev.key);
                setRow(expandedState, activeRow);
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRow, rowDict, attempts, word.length]);

    return (
        <div>
            { [...Array(attempts)].map((val, ind) => <TileRow key={ind} rowLength={word.length} rowState={rowDict[ind]} />) }
        </div>
    );
}