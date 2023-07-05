export const range = (start: number, end: number, step = 1): number[] => {
    const result: number[] = [];
    for (let i = start; i < end; i += step) {
        result.push(i);
    }
    return result;
};