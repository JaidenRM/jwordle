import { FC, useEffect, useMemo, useState } from "react";
import { GameStatus } from "../../@enums/gameStatus";
import { TileStatus } from "../../@enums/tileStatus";
import { HtmlProps } from "../../@types/html";
import { GameState } from "../../@types/states/game";
import { LetterState } from "../../@types/states/letter";
import { WordValidator } from "../../@types/words/validator";
import { KeyHelper } from "../../utils/helpers/key";
import { StringHelper } from "../../utils/helpers/string";
import { TileHelper } from "../../utils/helpers/tile";
import { LocalWordValidator } from "../../utils/validators/word/local";
import { TileRow } from "../TileRow";

interface BoardProps extends HtmlProps {
    gameState: GameState,
    boardState: LetterState[][]
    setGameState: (state: Partial<GameState>) => void
    setBoardState: (rowState: LetterState[], rowIndex: number) => void
}

export const Board: FC<BoardProps> = ({ gameState, boardState, setGameState, setBoardState, className }) => {
    const { wordToGuess, totalAttempts } = gameState;
    const [activeRow, setActiveRow] = useState(0);

    //Using useMemo due to expensive ctor
    const validator: WordValidator = useMemo(() => new LocalWordValidator(wordToGuess), [wordToGuess]);

    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            var trimmedWord = TileHelper.toString(boardState[activeRow]).trim();
            if (ev.key === KeyHelper.ENTER && trimmedWord.length === wordToGuess.length) {
                if (!validator.isValidWord(trimmedWord)) {
                    //TODO: improve on
                    alert('Guess again, that word is not in our list');
                    return;
                }

                setBoardState(validator.checkGuess(trimmedWord), activeRow);
                setActiveRow(prev => prev + 1);
            } else if (ev.key === KeyHelper.BACKSPACE) {
                const shortenedState = TileHelper.fromString(StringHelper.removeLastChar(trimmedWord));
                setBoardState(shortenedState, activeRow);
            } else if (KeyHelper.isAlphaKey(ev.key)) {
                const expandedState = TileHelper.fromString(trimmedWord + ev.key);
                setBoardState(expandedState, activeRow);
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRow, boardState, totalAttempts, wordToGuess.length]);

    useEffect(() => {
        if (activeRow >= totalAttempts)
        setGameState({ status: GameStatus.Lost });
        else if (activeRow > 0 && boardState[activeRow - 1].every(tile => tile.status === TileStatus.Correct)) 
            setGameState({
                usedAttempts: activeRow,
                status: GameStatus.Won,
            });
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRow, boardState, totalAttempts])

    return (
        <div className={`flex flex-row flex-wrap ${className}`}>
            { [...Array(totalAttempts)].map((val, ind) =>
                <TileRow
                    key={ind}
                    className="w-full justify-center"
                    rowLength={wordToGuess.length}
                    rowState={boardState[ind]}
                />) }
        </div>
    );
}