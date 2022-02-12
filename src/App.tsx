import { GameStatus } from './@enums/gameStatus';
import { useGameState } from './@hooks/useGameState';
import { WordGenerator } from './@types/words/generator';
import { Board } from './components/Board';
import { LocalWordGenerator } from './utils/generators/words/local';

function App() {
  const generator: WordGenerator = new LocalWordGenerator();
  const [gameState, setGameState] = useGameState({
    status: GameStatus.InGame,
    wordToGuess: generator.getRandomLengthWord(5),
    totalAttempts: 6,
    usedAttempts: 0,
  });

  return (
    <div className="App">
      <div className="random-word">
        <h2>Our random word is:</h2>
        <h1>{generator.getRandomWord()}</h1>
      </div>
      <div className="random-n-word">
        <h2>Our random 5 letter word is:</h2>
        <h1>{generator.getRandomLengthWord(5)}</h1>
      </div>
      <div className="board">
        <Board word={gameState.wordToGuess} attempts={gameState.totalAttempts} onGameEnd={setGameState} />
      </div>
    </div>
  );
}

export default App;
