import { FC } from "react";
import { TileStatus } from "../../@enums/tileStatus";
import { HtmlProps } from "../../@types/html";
import { LetterState } from "../../@types/states/letter";

const getBackgroundColour = (tileStatus?: TileStatus): string => {
    switch (tileStatus) {
        case TileStatus.Correct:
            return 'bg-green-600';
        case TileStatus.WrongSpot:
            return 'bg-yellow-300';
        case TileStatus.Incorrect:
            return 'bg-gray-500';
        default:
            return 'white';
    }
}

interface TileProps extends HtmlProps {
    state: LetterState
}

export const Tile: FC<TileProps> = ({ state, className }) => {
    if (!state) return <div>ERR</div>

    const { letter, status } = state;

    return (
        <div className={`border-black h-12 w-12 lg:h-16 lg:w-16 border rounded-md font-bold m-1 text-center align-middle text-3xl leading-[3rem] lg:text-4xl lg:leading-[4rem] ${getBackgroundColour(status)} ${className}`}>
            {letter.toString().toUpperCase()}
        </div>
    );
}