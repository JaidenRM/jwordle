import { TileStatus } from "../../../@enums/tileStatus";
import { Char } from "../../../@types/char";
import { LetterState } from "../../../@types/states/letter";
import { WordValidator } from "../../../@types/words/validator";
import { WordList } from "../../lists/words";

export class LocalWordValidator implements WordValidator {
    private readonly targetWord: string;
    private readonly validWords: string[];

    constructor (word: string) {
        this.targetWord = word.toLowerCase();
        this.validWords = new WordList().getWords();
    }

    isValidWord = (word: string): boolean => {
        if (word.length !== this.targetWord.length) return false;

        return this.validWords.find(validWord => validWord.toLowerCase() === word.toLowerCase()) !== undefined;
    }

    checkGuess = (guess: string): LetterState[] => {
        const parsedGuess = guess.toLowerCase();
        const targetArr = [...this.targetWord];
        const tileStatuses = [...parsedGuess].map(letter => ({ letter: new Char(letter), status: TileStatus.Incorrect }));

        if (guess.length !== targetArr.length) return [];

        targetArr.forEach((letter, ind) => {
            if (letter === parsedGuess[ind]) tileStatuses[ind].status = TileStatus.Correct;
        });

        targetArr.forEach((letter, ind) => {
            if (tileStatuses[ind].status === TileStatus.Correct) return;
            
            const foundIndex = [...parsedGuess].findIndex((guessLetter, i) => guessLetter === letter && tileStatuses[i].status === TileStatus.Incorrect);
            if (foundIndex !== -1) tileStatuses[foundIndex].status = TileStatus.WrongSpot;
        });

        return tileStatuses;
    }
}