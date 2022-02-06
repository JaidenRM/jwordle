import { WordGenerator } from './@types/words/generator';
import { Board } from './components/Board';
import { LocalWordGenerator } from './utils/generators/words/local';

function App() {
  const generator: WordGenerator = new LocalWordGenerator();

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
        <Board word={generator.getRandomLengthWord(5)} attempts={6} />
      </div>
    </div>
  );
}

export default App;
