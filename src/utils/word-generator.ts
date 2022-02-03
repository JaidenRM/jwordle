import { WordController } from "../@types/data/word-controller";
import { MathHelper } from "./math-helper";
import { wordList } from "./word-list";

// TODO: solve async issue ctor
export class WordGenerator implements WordController {
    private wordArr: string[];

    constructor() {
        this.wordArr = wordList.list
            .replace(/ /g,'')
            .split(/\r?\n/)
            .filter(word => word !== '');
    }

    getRandomWord(): string {
        var rndInd = new MathHelper().getRandomNumber(0, this.wordArr.length);

        return this.wordArr[rndInd];
    }
    getRandomLengthWord(length: number): string {
        var filteredWords = this.wordArr.filter(word => word.length === length);
        var rndInd = new MathHelper().getRandomNumber(0, filteredWords.length);

        return filteredWords[rndInd];
    }
}