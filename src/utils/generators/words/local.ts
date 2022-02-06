import { WordGenerator } from "../../../@types/words/generator";
import { MathHelper } from "../../helpers/math";
import { WordList } from "../../lists/words";

export class LocalWordGenerator implements WordGenerator {
    private wordArr: string[];

    constructor() {
        this.wordArr = new WordList().getWords();
    }

    getRandomWord(): string {
        var rndInd = MathHelper.getRandomNumber(0, this.wordArr.length);

        return this.wordArr[rndInd];
    }
    getRandomLengthWord(length: number): string {
        var filteredWords = this.wordArr.filter(word => word.length === length);
        var rndInd = MathHelper.getRandomNumber(0, filteredWords.length);

        return filteredWords[rndInd];
    }
}