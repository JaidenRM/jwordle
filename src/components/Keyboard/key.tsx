import { CSSProperties, FC } from "react";
import { TileStatus } from "../../@enums/tileStatus";

const tileStyle: CSSProperties = { 
    border: '1px solid black',
    borderRadius: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0.25rem',
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
};

const getBackgroundColour = (tileStatus?: TileStatus): CSSProperties => {
    let bgColour = 'lightgrey';
    
    switch (tileStatus) {
        case TileStatus.Correct:
            bgColour = 'green';
            break;
        case TileStatus.WrongSpot:
            bgColour = 'yellow';
            break;
        case TileStatus.Incorrect:
            bgColour = 'grey';
            break;
    }

    return { backgroundColor: bgColour };
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
        <div style={{...tileStyle, ...getBackgroundColour(status)}} onClick={onKeyClick}>
            {(displayValue ?? value).toUpperCase()}
        </div>
    );
}