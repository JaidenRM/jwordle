import { useMemo } from 'react';
import { GameStatus } from './@enums/gameStatus';
import { useBoardRowState } from './@hooks/useBoardRowState';
import { useGameState } from './@hooks/useGameState';
import { WordGenerator } from './@types/words/generator';
import { Board } from './components/Board';
import { Keyboard } from './components/Keyboard';
import { LocalWordGenerator } from './utils/generators/words/local';

function App() {
  const generator: WordGenerator = useMemo(() => new LocalWordGenerator(), []);
  const [gameState, setGameState] = useGameState({
    status: GameStatus.InGame,
    wordToGuess: generator.getRandomLengthWord(5),
    totalAttempts: 6,
    usedAttempts: 0,
  });
  const [boardState, setBoardState] = useBoardRowState(gameState.wordToGuess.length, gameState.totalAttempts);

  return (
    <div className="App">
      <div className="board">
        <Board gameState={gameState} boardState={boardState} setGameState={setGameState} setBoardState={setBoardState} />
      </div>
      <div className="keyboard" style={{ width: "550px"}}>
        <Keyboard letterStates={boardState.flatMap(state => state)} />
      </div>
    </div>
  );
}

export default App;
