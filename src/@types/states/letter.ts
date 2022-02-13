import { TileStatus } from "../../@enums/tileStatus";
import { Char } from "../char";

export interface LetterState {
    letter: Char
    status: TileStatus
}