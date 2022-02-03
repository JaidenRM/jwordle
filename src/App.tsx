import { WordGenerator } from './utils/word-generator';

function App() {
  var wordGen = new WordGenerator();

  return (
    <div className="App">
      <div className="random-word">
        <h2>Our random word is:</h2>
        <h1>{wordGen.getRandomWord()}</h1>
      </div>
      <div className="random-n-word">
        <h2>Our random 5 letter word is:</h2>
        <h1>{wordGen.getRandomLengthWord(5)}</h1>
      </div>
    </div>
  );
}

export default App;
