import { CSSProperties, FC } from "react";
import { LetterState } from "../../@types/states/letter";
import { Tile } from "../Tile";

const tileRowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row"
}

interface TileRowProps {
    rowLength: number
    rowState: LetterState[]
}

export const TileRow: FC<TileRowProps> = ({ rowLength, rowState }) => {
    return (
        <div style={tileRowStyle}>
            { [...Array(rowLength)].map((val, ind) => <Tile key={ind} state={rowState[ind]} />) }
        </div>
    );
}