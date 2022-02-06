import { CSSProperties, FC } from "react";
import { TileState } from "../../@types/tile/state";
import { Tile } from "../Tile";

const tileRowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row"
}

interface TileRowProps {
    rowLength: number
    rowState: TileState[]
}

export const TileRow: FC<TileRowProps> = ({ rowLength, rowState }) => {
    return (
        <div style={tileRowStyle}>
            { [...Array(rowLength)].map((val, ind) => <Tile key={ind} state={rowState[ind]} />) }
        </div>
    );
}