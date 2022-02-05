export class StringHelper {
    static removeLastChar = (str: string): string => {
        if (str === '') return str;

        return str.substring(0, str.length - 1);
    }
}