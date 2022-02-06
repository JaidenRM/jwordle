export interface WordGenerator {
    getRandomWord(): string
    getRandomLengthWord(length: number): string
}