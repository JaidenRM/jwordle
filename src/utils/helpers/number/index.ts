export class NumberHelper {
  static toLeadingZerosString(num: number, strLength: number): string {
    const numStr = num.toString();

    if (numStr.length >= strLength) return numStr;

    return numStr.padStart(strLength, "0");
  }
}
