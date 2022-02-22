export class ArrayHelper {
    static partition<T>(arr: T[], pred: (item: T) => boolean) {
        const passed: T[] = [];
        const failed: T[] = [];

        arr.forEach(item => {
            if (pred(item)) passed.push(item);
            else failed.push(item);
        });

        return { passed, failed };
    }
}