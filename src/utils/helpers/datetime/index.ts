export class DateTimeHelper {
  static getNumberOfDays(start: Date, end: Date): number {
    const dayInMs = 1000 * 60 * 60 * 24;

    const diffInMs = end.getTime() - start.getTime();
    return Math.floor(diffInMs / dayInMs);
  }

  static wasWithinYesterday(prevDate: Date, now?: Date): boolean {
    now ||= new Date();

    const dayBeforeNow = new Date();
    dayBeforeNow.setDate(dayBeforeNow.getDate() - 1);

    const wasYesterday =
      prevDate.getDate() === dayBeforeNow.getDate() &&
      prevDate.getMonth() === dayBeforeNow.getMonth() &&
      prevDate.getFullYear() === dayBeforeNow.getFullYear();

    return wasYesterday || this.isToday(prevDate, now);
  }

  static isToday(date: Date, now?: Date): boolean {
    now ||= new Date();

    return (
      date.getDate() === now!.getDate() &&
      date.getMonth() === now!.getMonth() &&
      date.getFullYear() === now!.getFullYear()
    );
  }
}
