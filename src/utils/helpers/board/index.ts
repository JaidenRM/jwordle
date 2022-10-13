import { BoardStatus } from "../../../@enums/boardStatus";
import { TileStatus } from "../../../@enums/tileStatus";
import { BoardState } from "../../../@types/states/board";
import { LetterState } from "../../../@types/states/letter";

export class BoardHelper {
  static stateToFriendlyString(state: BoardState): string {
    let friendlyStr = "";
    const completedStatuses = [BoardStatus.Completed, BoardStatus.Failed];

    if (!completedStatuses.includes(state.status))
      friendlyStr += "jwordle is still being attempted \n\n";
    else
      friendlyStr += `jwordle ${
        state.status === BoardStatus.Failed ? "X" : state.rowIndex
      }/${state.maxAttempts} \n\n`;

    state.board.forEach((row) => {
      const friendlyRow = row.map(convertLetterStateToString);
      friendlyStr += friendlyRow.join("") + " \n";
    });

    return friendlyStr;
  }
}

const convertLetterStateToString = (letter: LetterState): string => {
  switch (letter.status) {
    case TileStatus.Correct:
      return "🟩";
    case TileStatus.WrongSpot:
      return "🟨";
    case TileStatus.Incorrect:
      return "⬜";
    default:
      return "";
  }
};
