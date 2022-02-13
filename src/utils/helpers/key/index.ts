export class KeyHelper {
    static readonly ENTER = "Enter";
    static readonly BACKSPACE = "Backspace";
    static readonly UpperAlpha = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    static isAlphaKey = (key: string) => {
        return [...this.UpperAlpha, ...this.UpperAlpha.map(letter => letter.toLowerCase())].includes(key);
    }
}