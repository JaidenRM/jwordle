export class Char {
    readonly char: string;

    constructor(char: string) {
        if (char.length !== 1) {
            throw new Error(`${char} is not a single character`);
        }

        this.char = char;
    }

    toString() {
        return this.char;
    }

    static isChar(obj: any): obj is Char {
        return typeof obj === "object" && "char" in obj && obj.char.length === 1;
    }
}