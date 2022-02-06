import { CSSProperties, FC } from "react";
import { TileStatus } from "../../@enums/tileStatus";
import { TileState } from "../../@types/tile/state";

const tileStyle: CSSProperties = { 
    border: '1px solid black',
    height: '2rem',
    width: '2rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0.25rem',
    display: 'flex',
    justifyContent: 'center'
};

const getBackgroundColour = (tileStatus?: TileStatus): CSSProperties => {
    let bgColour = 'white';
    
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
        case TileStatus.Editing:
            bgColour = 'white';
    }

    return { backgroundColor: bgColour };
}

interface TileProps {
    state: TileState
}

export const Tile: FC<TileProps> = ({state}) => {
    if (!state) return <div>ERR</div>

    const { letter, status } = state;

    return (
        <div style={{...tileStyle, ...getBackgroundColour(status)}}>
            {letter.toString().toUpperCase()}
        </div>
    );
}