import { TileStatus } from "../../../@enums/tileStatus";
import { Char } from "../../../@types/char";
import { TileState } from "../../../@types/tile/state";

export class TileHelper {
    static toString(rowState: TileState[]): string {
        if (!rowState) return '';

        return rowState.map(tile => tile.letter.toString()).join('');
    }

    static fromString(str: string): TileState[] {
        return [...str].map(letter => ({
            letter: new Char(letter),
            status: TileStatus.Editing,
        }))
    }
}