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
        var tileStatuses: LetterState[] = [];
        var parsedGuess = guess.toLowerCase();

        for(let i = 0; i < this.targetWord.length; i++) {
            if (parsedGuess.length < i) tileStatuses.push({ letter: new Char(guess[i]), status: TileStatus.Incorrect }); // This shouldn't occur bc of `isValidWord`
            else if (parsedGuess[i] === this.targetWord[i]) tileStatuses.push({ letter: new Char(guess[i]), status: TileStatus.Correct });
            else if (parsedGuess.indexOf(this.targetWord[i]) !== -1) tileStatuses.push({ letter: new Char(guess[i]), status: TileStatus.WrongSpot });
            else tileStatuses.push({ letter: new Char(guess[i]), status: TileStatus.Incorrect });
        }

        return tileStatuses;
    }
}