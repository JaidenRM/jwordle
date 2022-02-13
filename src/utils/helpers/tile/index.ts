import { TileStatus } from "../../../@enums/tileStatus";
import { Char } from "../../../@types/char";
import { LetterState } from "../../../@types/states/letter";

export class TileHelper {
    static toString(rowState: LetterState[]): string {
        if (!rowState) return '';

        return rowState.map(tile => tile.letter.toString()).join('');
    }

    static fromString(str: string): LetterState[] {
        return [...str].map(letter => ({
            letter: new Char(letter),
            status: TileStatus.Editing,
        }))
    }
}