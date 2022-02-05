import { CSSProperties, FC } from "react";
import { Tile } from "../Tile";

const tileRowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row"
}

interface TileRowProps {
    rowLength: number
    rowWord: string
}

export const TileRow: FC<TileRowProps> = ({ rowLength, rowWord }) => {
    return (
        <div style={tileRowStyle}>
            { [...Array(rowLength)].map((val, ind) => <Tile key={ind} char={rowWord[ind]} />) }
        </div>
    );
}