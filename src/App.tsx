import { useEffect, useMemo } from 'react';
import { useBoardState } from './@hooks/useBoardState';
import { WordGenerator } from './@types/words/generator';
import { Board } from './components/Board';
import { Keyboard } from './components/Keyboard';
import { LocalWordGenerator } from './utils/generators/words/local';
import './index.css';
import { BoardStatus } from './@enums/boardStatus';

function App() {
  const generator: WordGenerator = useMemo(() => new LocalWordGenerator(), []);
  const { state, setRow, setStatus } = useBoardState(generator.getLengthWord(5), 6);
  
  useEffect(() => {
    switch (state.status) {
      case BoardStatus.Failed:
          alert(`Unfortunately you didn't guess correctly. The word was ${state.targetWord}.`);
          break;
      case BoardStatus.Completed:
          alert(`Congratulations. You won in ${state.rowIndex} attempts!`);
          break;
    }
  }, [state.status]);

  return (
    <div className="container mx-auto flex flex-row flex-wrap h-full">
      <h1 className="text-5xl lg:text-7xl font-bold text-center w-full">jwordle</h1>
      <div className="flex-grow m-auto">
        <Board
          className="container mx-auto"
          state={state}
          setRow={setRow}
          setStatus={setStatus}
        />
      </div>
      <Keyboard letterStates={state.board.flatMap(row => row)} className="w-[650px]" />
    </div>
  );
}

export default App;
