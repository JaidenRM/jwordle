import { FC } from "react";
import { TileStatus } from "../../@enums/tileStatus";
import { LetterState } from "../../@types/states/letter";
import { KeyHelper } from "../../utils/helpers/key";
import { Key } from "./key";

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
        <div className="flex w-[650px] m-auto">
            <div className="flex flex-wrap justify-center basis-5/6">
                {KeyHelper.UpperAlpha.map(key => 
                    <div className="basis-[10%]" >
                        <Key key={key} value={key} status={findKeyStatus(key, letterStates)} />
                    </div>)}
            </div>
            <div className="flex flex-wrap basis-1/6 justify-start flex-col">
                <div><Key value={KeyHelper.BACKSPACE} displayValue="⬅" /></div>
                <div><Key value={KeyHelper.ENTER} displayValue="↵" /></div>
            </div>
        </div>
    );
}