import { LetterState } from "../states/letter";

export interface WordValidator {
    isValidWord(word: string): boolean
    checkGuess(guess: string): LetterState[]
}