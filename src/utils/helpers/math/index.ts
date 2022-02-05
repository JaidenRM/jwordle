export class MathHelper {
    static getRandomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        // random; 0 inc, 1 exc
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}