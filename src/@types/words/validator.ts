import { TileState } from "../tile/state";

export interface WordValidator {
    isValidWord(word: string): boolean
    checkGuess(guess: string): TileState[]
}