import { DateTime } from "luxon";
import { FC } from "react";
import { Modal } from "..";
import { BoardStatus } from "../../../@enums/boardStatus";
import { BoardState } from "../../../@types/states/board";
import { Statistics } from "../../../@types/states/statistics";
import { BoardHelper } from "../../../utils/helpers/board";
import { BarChart } from "../../Charts/Bar";
import { Timer } from "../../Timer";

interface StatsModalProps {
  isVisible: boolean;
  statistics: Statistics;
  boardState: BoardState;
  onClose: () => void;
}

export const StatsModal: FC<StatsModalProps> = ({
  isVisible,
  onClose,
  statistics,
  boardState,
}) => {
  const {
    gamesPlayed,
    gamesWon,
    gamesWonByGuesses,
    currentConsecutiveGames,
    maxConsecutiveGames,
  } = statistics;

  const winPercentage = Math.floor((gamesWon / (gamesPlayed || 1)) * 100);
  const resetDateTime = DateTime.now().plus({ days: 1 }).startOf("day");

  const shareHandler = () => {
    const strToCopy = BoardHelper.stateToFriendlyString(boardState);
    navigator.clipboard.writeText(strToCopy);
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <>
        <div className="flex justify-center flex-col w-full gap-4">
          <div className="text-center font-bold text-xl">Statistics</div>
          <div>
            <div className="flex justify-center text-center">
              <div className="flex-1 font-bold text-3xl">{gamesPlayed}</div>
              <div className="flex-1 font-bold text-3xl">{winPercentage}</div>
              <div className="flex-1 font-bold text-3xl">
                {currentConsecutiveGames}
              </div>
              <div className="flex-1 font-bold text-3xl">
                {maxConsecutiveGames}
              </div>
            </div>
            <div className="flex justify-center text-center">
              <div className="flex-1 text-sm">Played</div>
              <div className="flex-1 text-sm">Win %</div>
              <div className="flex-1 text-sm">Current Streak</div>
              <div className="flex-1 text-sm">Max Streak</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col w-full my-4 font-bold">
          <div className="text-center text-xl">Guess Distribution</div>
          <div className="text-center px-12 py-4">
            <BarChart isVertical data={gamesWonByGuesses} />
          </div>
        </div>
        <div className="flex justify-center flex-row w-full">
          {boardState.status !== BoardStatus.Attempting && (
            <div className="border-r text-center flex-1">
              <div>Next jwordle</div>
              <div>
                <Timer
                  targetTime={resetDateTime}
                  onFinish={() => window.location.reload()}
                />
              </div>
            </div>
          )}

          <div className="text-center flex-1 m-auto">
            <button
              className="border border-black bg-lighter-green rounded-3xl px-8 py-1 font-bold hover:bg-darker-green"
              type="button"
              onClick={shareHandler}
            >
              Share
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};
