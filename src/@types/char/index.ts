export class Char {
    readonly value: string;

    constructor(char: string) {
        if (char.length !== 1) {
            throw new Error(`${char} is not a single character`);
        }

        this.value = char;
    }

    toString() {
        return this.value;
    }
}