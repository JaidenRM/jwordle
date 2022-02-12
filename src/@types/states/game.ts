import { GameStatus } from "../../@enums/gameStatus";

export interface GameState {
    wordToGuess: string
    status: GameStatus
    totalAttempts: number
    usedAttempts: number
};