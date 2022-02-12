import { FC, useEffect, useMemo, useState } from "react";
import { GameStatus } from "../../@enums/gameStatus";
import { TileStatus } from "../../@enums/tileStatus";
import { useBoardRowState } from "../../@hooks/useBoardRowState";
import { GameState } from "../../@types/states/game";
import { WordValidator } from "../../@types/words/validator";
import { KeyHelper } from "../../utils/helpers/key";
import { StringHelper } from "../../utils/helpers/string";
import { TileHelper } from "../../utils/helpers/tile";
import { LocalWordValidator } from "../../utils/validators/word/local";
import { TileRow } from "../TileRow";

interface BoardProps {
    word: string
    attempts: number
    onGameEnd?: (state: Partial<GameState>) => void
}

export const Board: FC<BoardProps> = ({ word, attempts, onGameEnd }) => {
    const [rowDict, setRow] = useBoardRowState(word.length, attempts);
    const [activeRow, setActiveRow] = useState(0);

    //Using useMemo due to expensive ctor
    const validator: WordValidator = useMemo(() => new LocalWordValidator(word), [word]);

    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            var trimmedWord = TileHelper.toString(rowDict[activeRow]).trim();
            if (ev.key === KeyHelper.ENTER && trimmedWord.length === word.length) {
                if (!validator.isValidWord(trimmedWord)) {
                    //TODO: improve on
                    alert('Guess again, that word is not in our list');
                    return;
                }

                setRow(validator.checkGuess(trimmedWord), activeRow);
                setActiveRow(prev => prev + 1);
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

    useEffect(() => {
        if (activeRow >= attempts && onGameEnd)
            onGameEnd({ status: GameStatus.Lost });
        else if (activeRow > 0 && rowDict[activeRow - 1].every(tile => tile.status === TileStatus.Correct) && onGameEnd) 
            onGameEnd({
                usedAttempts: activeRow,
                status: GameStatus.Won,
            });
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRow, rowDict, attempts])

    return (
        <div>
            { [...Array(attempts)].map((val, ind) => <TileRow key={ind} rowLength={word.length} rowState={rowDict[ind]} />) }
        </div>
    );
}