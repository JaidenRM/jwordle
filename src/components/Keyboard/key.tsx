import { FC } from "react";
import { TileStatus } from "../../@enums/tileStatus";

const getBackgroundColour = (tileStatus?: TileStatus): string => {    
    switch (tileStatus) {
        case TileStatus.Correct:
            return 'bg-green-600';
        case TileStatus.WrongSpot:
            return 'bg-yellow-300';
        case TileStatus.Incorrect:
            return 'bg-gray-500';
        default:
            return 'bg-zinc-300';
    }
}

interface KeyProps {
    value: string
    displayValue?: string
    status?: TileStatus
    onClick?: () => void
}

export const Key: FC<KeyProps> = ({value, displayValue, status = TileStatus.Editing, onClick}) => {

    const onKeyClick = () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': value }));

        if (onClick) onClick();
    }

    return (
        <div 
            className={`border-black border rounded-md text-2xl font-bold m-1 px-2 py-1 flex justify-center align-middle cursor-pointer ${getBackgroundColour(status)}`} 
            onClick={onKeyClick}
        >
            {(displayValue ?? value).toUpperCase()}
        </div>
    );
}