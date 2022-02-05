export class KeyHelper {
    static readonly ENTER = "Enter";
    static readonly BACKSPACE = "Backspace";

    static isAlphaKey = (key: string) => {
        return /^[a-zA-Z]$/.test(key);
    }
}