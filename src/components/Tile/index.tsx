import { CSSProperties, FC } from "react";

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

interface TileProps {
    char: string
}

export const Tile: FC<TileProps> = ({ char }) => {

    return (
        <div style={tileStyle}>
            {char.toUpperCase()}
        </div>
    );
}