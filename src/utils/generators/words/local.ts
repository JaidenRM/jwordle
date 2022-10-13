import { DateTime } from "luxon";
import { WordGenerator } from "../../../@types/words/generator";
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
    const filteredWords = this.wordArr.filter((word) => word.length === length);
    const rndInd = MathHelper.getRandomNumber(0, filteredWords.length);

    return filteredWords[rndInd];
  }

  getLengthWord(length: number): string {
    const filteredWords = this.wordArr.filter((word) => word.length === length);

    const startingDate = DateTime.local(1997, 8, 21);
    const now = DateTime.local();
    const daysPassed = Math.floor(
      Math.abs(startingDate.diff(now, "days").days)
    );

    return filteredWords[daysPassed % filteredWords.length];
  }
}
