export class DateTimeHelper {

    static getNumberOfDays(start: Date, end: Date): number {
        const dayInMs = 1000 * 60 * 60 * 24;

        const diffInMs = end.getTime() - start.getTime();
        return Math.floor(diffInMs / dayInMs);
    }
}