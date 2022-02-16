import { useMemo } from 'react';
import { GameStatus } from './@enums/gameStatus';
import { useBoardRowState } from './@hooks/useBoardRowState';
import { useGameState } from './@hooks/useGameState';
import { WordGenerator } from './@types/words/generator';
import { Board } from './components/Board';
import { Keyboard } from './components/Keyboard';
import { LocalWordGenerator } from './utils/generators/words/local';
import './index.css';

function App() {
  const generator: WordGenerator = useMemo(() => new LocalWordGenerator(), []);
  const [gameState, setGameState] = useGameState({
    status: GameStatus.InGame,
    wordToGuess: generator.getLengthWord(5),
    totalAttempts: 6,
    usedAttempts: 0,
  });
  const [boardState, setBoardState] = useBoardRowState(gameState.wordToGuess.length, gameState.totalAttempts);

  return (
    <div className="container mx-auto flex flex-row flex-wrap h-screen">
      <h1 className="text-5xl lg:text-7xl font-bold text-center w-full mb-6">jwordle</h1>
      <div className="flex-grow mb-6">
        <Board
          className="container mx-auto"
          gameState={gameState}
          boardState={boardState}
          setGameState={setGameState}
          setBoardState={setBoardState}
        />
      </div>
      <Keyboard letterStates={boardState.flatMap(state => state)} className="w-[650px]" />
    </div>
  );
}

export default App;
