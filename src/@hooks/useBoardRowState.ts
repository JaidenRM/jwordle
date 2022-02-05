import { useState } from "react"

const parseRowWord = (word: string, rowLength: number) => {
    if (word.length === rowLength) return word;
    if (word.length > rowLength) return word.slice(0, rowLength);

    var extraSpaces = ' '.repeat(rowLength - word.length);
    return word + extraSpaces;
}

export const useBoardRowState = (wordLength: number, attempts: number) => {
    const [boardState, setBoardState] = useState<string[]>(Array(attempts).fill(parseRowWord('', wordLength)));

    const setRow = (word: string, rowIndex: number) => {
        if (rowIndex > boardState.length) return;

        setBoardState(prev => {
            prev[rowIndex] = parseRowWord(word, wordLength);

            return [...prev];
        })
    }

    return [boardState, setRow] as const;
}