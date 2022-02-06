import { TileStatus } from "../../@enums/tileStatus";
import { Char } from "../char";

export interface TileState {
    letter: Char
    status: TileStatus
}