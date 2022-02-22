import { BoardStatus } from "../../@enums/boardStatus";
import { LetterState } from "./letter";

export interface BoardState {
    board: LetterState[][]
    rowIndex: number
    targetWord: string
    maxAttempts: number
    status: BoardStatus
}

export interface BoardValues {
    state: BoardState
    setRow: (row: LetterState[], lockInRow: boolean) => void
    setStatus: (status: BoardStatus) => void
}