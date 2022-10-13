import { useEffect, useMemo, useState } from "react";
import { useBoardState } from "./@hooks/useBoardState";
import { WordGenerator } from "./@types/words/generator";
import { Board } from "./components/Board";
import { Keyboard } from "./components/Keyboard";
import { LocalWordGenerator } from "./utils/generators/words/local";
import "./index.css";
import { BoardStatus } from "./@enums/boardStatus";
import { StatsModal } from "./components/Modal/Statistic";
import { IoStatsChart } from "react-icons/io5";
import { useStatistics } from "./@hooks/useStatistics";

function App() {
  const generator: WordGenerator = useMemo(() => new LocalWordGenerator(), []);
  const { state, setRow, setStatus } = useBoardState(
    generator.getLengthWord(5),
    6
  );
  const [isVisible, setIsVisible] = useState(false);
  const [statistics, setStatistics] = useStatistics();

  const setStatusHandler = (status: BoardStatus) => {
    setStatus(status);

    if ([BoardStatus.Completed, BoardStatus.Failed].includes(status))
      setStatistics(status === BoardStatus.Completed, state.rowIndex);
  };

  useEffect(() => {
    switch (state.status) {
      case BoardStatus.Failed:
        alert(
          `Unfortunately you didn't guess correctly. The word was ${state.targetWord}.`
        );
        setIsVisible(true);
        break;
      case BoardStatus.Completed:
        alert(`Congratulations. You won in ${state.rowIndex} attempts!`);
        setIsVisible(true);
        break;
    }
  }, [state.status]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row w-full p-2">
        <div className="w-16 lg:w-20"></div>
        <h1 className="text-5xl lg:text-7xl font-bold text-center w-full flex-grow">
          jwordle
        </h1>
        <div className="w-16 lg:w-20 mt-auto">
          <IoStatsChart
            onClick={() => setIsVisible(true)}
            className="text-4xl lg:text-6xl"
          />
        </div>
      </div>
      <div className="container mx-auto flex flex-row flex-wrap flex-grow">
        <div className="flex-grow m-auto">
          <Board
            className="container mx-auto"
            state={state}
            setRow={setRow}
            setStatus={setStatusHandler}
          />
        </div>
        <Keyboard
          letterStates={state.board.flatMap((row) => row)}
          className="w-[650px]"
        />
      </div>
      <StatsModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        statistics={statistics}
        boardState={state}
      />
    </div>
  );
}

export default App;
