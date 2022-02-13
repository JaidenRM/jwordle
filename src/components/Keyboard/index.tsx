import { CSSProperties, FC } from "react";
import { TileStatus } from "../../@enums/tileStatus";
import { LetterState } from "../../@types/states/letter";
import { KeyHelper } from "../../utils/helpers/key";
import { Key } from "./key";

const lettersStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
}

const letterStyle: CSSProperties = {
    flex: "0 1 10%",
}

interface KeyboardProps {
    letterStates?: LetterState[]
}

const findKeyStatus = (targetKey: string, letterStates?: LetterState[]): TileStatus | undefined => {
    if (letterStates) {
        var sortedByStatus = letterStates
            .filter(state => state.letter.toString().toLowerCase() === targetKey.toLowerCase())
            .sort((a, b) => b.status - a.status);
        
        if (sortedByStatus.length) return sortedByStatus[0].status;
    }

    return undefined;
}

export const Keyboard: FC<KeyboardProps> = ({ letterStates }) => {
    return (
        <div style={{ display: "flex" }}>
            <div className="letters" style={lettersStyle}>
                {KeyHelper.UpperAlpha.map(key => (
                    <div style={letterStyle} key={key}>
                        <Key value={key} status={findKeyStatus(key, letterStates)} />
                    </div>
                ))}
            </div>
            <div className="actions">
                <div><Key value={KeyHelper.BACKSPACE} displayValue="⬅" /></div>
                <div><Key value={KeyHelper.ENTER} displayValue="↵" /></div>
            </div>
        </div>
    );
}