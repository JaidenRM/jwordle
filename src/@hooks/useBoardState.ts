import { BoardStatus } from "../@enums/boardStatus";
import { LocalStorageKey } from "../@enums/localStorageKeys";
import { TileStatus } from "../@enums/tileStatus";
import { Char } from "../@types/char";
import { BoardState, BoardValues } from "../@types/states/board";
import { LetterState } from "../@types/states/letter";
import { useLocalStorage } from "./useLocalStorage";

const parseRowState = (
  rowState: LetterState[],
  rowLength: number
): LetterState[] => {
  if (rowState.length === rowLength) return rowState;
  if (rowState.length > rowLength) return rowState.slice(0, rowLength);

  var emptyState: LetterState = {
    letter: new Char(" "),
    status: TileStatus.Editing,
  };

  return [...rowState, ...Array(rowLength - rowState.length).fill(emptyState)];
};

export const useBoardState = (word: string, attempts: number): BoardValues => {
  const [boardState, setBoardState] = useLocalStorage<BoardState>(
    LocalStorageKey.BoardState,
    {
      board: Array(attempts).fill(parseRowState([], word.length)),
      rowIndex: 0,
      targetWord: word,
      maxAttempts: attempts,
      status: BoardStatus.Attempting,
    },
    {
      parseJsonToItem: (k, v) => (Char.isChar(v) ? new Char(v.char) : v),
      overwriteExistingItem: (existingItem, newItem) =>
        existingItem.targetWord !== newItem.targetWord,
    }
  );

  const setRow = (rowState: LetterState[], lockInRow: boolean) => {
    if (boardState.status !== BoardStatus.Attempting) return;

    setBoardState((prev) => {
      if (prev.rowIndex < prev.board.length)
        prev.board[prev.rowIndex] = parseRowState(rowState, word.length);

      if (lockInRow) prev.rowIndex += 1;

      return { ...prev };
    });
  };

  const setStatus = (status: BoardStatus) => {
    if (status !== boardState.status) {
      setBoardState((prev) => {
        prev.status = status;

        return { ...prev };
      });
    }
  };

  return { state: boardState, setRow, setStatus };
};
