import { DateTime } from "luxon";
import { FC } from "react";
import { Modal } from "..";
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

  const shareHandler = () => {
    const strToCopy = BoardHelper.stateToFriendlyString(boardState);
    navigator.clipboard.writeText(strToCopy);
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="w-[600px] h-[500px]">
        <div className="flex justify-center flex-col w-full">
          <div className="text-center">Statistics</div>
          <div>
            <div className="flex justify-center text-center">
              <div className="flex-1">{gamesPlayed}</div>
              <div className="flex-1">{winPercentage}</div>
              <div className="flex-1">{currentConsecutiveGames}</div>
              <div className="flex-1">{maxConsecutiveGames}</div>
            </div>
            <div className="flex justify-center text-center">
              <div className="flex-1">Played</div>
              <div className="flex-1">Win %</div>
              <div className="flex-1">Current Streak</div>
              <div className="flex-1">Max Streak</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-col w-full">
          <div className="text-center">Guess Distribution</div>
          <div className="text-center p-12">
            <BarChart isVertical data={gamesWonByGuesses} />
          </div>
        </div>
        <div className="flex justify-center flex-row w-full">
          <div className="border-r text-center flex-1">
            <div>Next jwordle</div>
            <div>
              <Timer
                targetTime={DateTime.now().plus({ days: 1 }).startOf("day")}
              />
            </div>
          </div>
          <div className="text-center flex-1 m-auto">
            <button type="button" onClick={shareHandler}>
              Share
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
