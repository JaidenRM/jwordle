import { useState } from "react"
import { TileStatus } from "../@enums/tileStatus";
import { Char } from "../@types/char";
import { LetterState } from "../@types/states/letter";

const parseRowState = (rowState: LetterState[], rowLength: number): LetterState[] => {
    if (rowState.length === rowLength) return rowState;
    if (rowState.length > rowLength) return rowState.slice(0, rowLength);

    var emptyState: LetterState = {
        letter: new Char(' '),
        status: TileStatus.Editing,
    }

    return [...rowState, ...Array(rowLength - rowState.length).fill(emptyState)];
}

export const useBoardRowState = (wordLength: number, attempts: number) => {
    const [boardState, setBoardState] = useState<LetterState[][]>(
        Array(attempts).fill(parseRowState([], wordLength))
    );

    const setRow = (rowState: LetterState[], rowIndex: number) => {
        if (rowIndex > boardState.length) return;

        setBoardState(prev => {
            prev[rowIndex] = parseRowState(rowState, wordLength);

            return [...prev];
        })
    }

    return [boardState, setRow] as const;
}