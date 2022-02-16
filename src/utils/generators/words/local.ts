import { WordGenerator } from "../../../@types/words/generator";
import { DateTimeHelper } from "../../helpers/datetime";
import { MathHelper } from "../../helpers/math";
import { WordList } from "../../lists/words";

export class LocalWordGenerator implements WordGenerator {
    private wordArr: string[];

    constructor() {
        this.wordArr = new WordList().getWords();
    }

    getRandomWord(): string {
        const rndInd = MathHelper.getRandomNumber(0, this.wordArr.length);

        return this.wordArr[rndInd];
    }

    getRandomLengthWord(length: number): string {
        const filteredWords = this.wordArr.filter(word => word.length === length);
        const rndInd = MathHelper.getRandomNumber(0, filteredWords.length);

        return filteredWords[rndInd];
    }

    getLengthWord(length: number): string {
        const filteredWords = this.wordArr.filter(word => word.length === length);
        
        const startingDate = new Date(1997, 8, 21);
        const daysPassed = DateTimeHelper.getNumberOfDays(startingDate, new Date());

        return filteredWords[daysPassed % filteredWords.length];
    }
}