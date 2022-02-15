import { FC } from "react";
import { HtmlProps } from "../../@types/html";
import { LetterState } from "../../@types/states/letter";
import { Tile } from "../Tile";

interface TileRowProps extends HtmlProps {
    rowLength: number
    rowState: LetterState[]
}

export const TileRow: FC<TileRowProps> = ({ rowLength, rowState, className }) => {
    return (
        <div className={`flex ${className}`}>
            { [...Array(rowLength)].map((val, ind) => <Tile key={ind} state={rowState[ind]} />) }
        </div>
    );
}