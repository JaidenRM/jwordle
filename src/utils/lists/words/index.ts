import { FortyKAmericanWords } from "./forty-k-american";

export class WordList {
    private readonly wordList;

    constructor () {
        this.wordList = FortyKAmericanWords;
    }

    getWords() {
        return this.wordList;
    }
}