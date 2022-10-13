import { FC, useEffect, useMemo } from "react";
import { BoardStatus } from "../../@enums/boardStatus";
import { TileStatus } from "../../@enums/tileStatus";
import { HtmlProps } from "../../@types/html";
import { BoardValues } from "../../@types/states/board";
import { WordValidator } from "../../@types/words/validator";
import { KeyHelper } from "../../utils/helpers/key";
import { StringHelper } from "../../utils/helpers/string";
import { TileHelper } from "../../utils/helpers/tile";
import { LocalWordValidator } from "../../utils/validators/word/local";
import { TileRow } from "../TileRow";

interface BoardProps extends HtmlProps, BoardValues {}

export const Board: FC<BoardProps> = ({
  state,
  setRow,
  setStatus,
  className,
}) => {
  const { board, rowIndex, targetWord, maxAttempts } = state;

  //Using useMemo due to expensive ctor
  const validator: WordValidator = useMemo(
    () => new LocalWordValidator(targetWord),
    [targetWord]
  );

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      var trimmedWord = TileHelper.toString(board[rowIndex]).trim();
      if (
        ev.key === KeyHelper.ENTER &&
        trimmedWord.length === targetWord.length
      ) {
        if (!validator.isValidWord(trimmedWord)) {
          //TODO: improve on
          alert("Guess again, that word is not in our list");
          return;
        }

        setRow(validator.checkGuess(trimmedWord), true);
      } else if (ev.key === KeyHelper.BACKSPACE) {
        const shortenedState = TileHelper.fromString(
          StringHelper.removeLastChar(trimmedWord)
        );
        setRow(shortenedState, false);
      } else if (KeyHelper.isAlphaKey(ev.key)) {
        const expandedState = TileHelper.fromString(trimmedWord + ev.key);
        setRow(expandedState, false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, maxAttempts, targetWord.length]);

  useEffect(() => {
    if (
      rowIndex > 0 &&
      board[rowIndex - 1].every((tile) => tile.status === TileStatus.Correct)
    )
      setStatus(BoardStatus.Completed);
    else if (rowIndex >= maxAttempts) setStatus(BoardStatus.Failed);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, maxAttempts, board]);

  return (
    <div className={`flex flex-row flex-wrap ${className}`}>
      {[...Array(maxAttempts)].map((_, ind) => (
        <TileRow
          key={ind}
          className="w-full justify-center"
          rowLength={targetWord.length}
          rowState={board[ind]}
        />
      ))}
    </div>
  );
};
