import dayjs from "dayjs";

const dateSort = (dateA:dayjs.ConfigType, dateB:dayjs.ConfigType) => dayjs(dateA).diff(dayjs(dateB));

const defaultSort = (a:number, b:number) => {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
};

export const Sorter = {
    DEFAULT: defaultSort,
    DATE: dateSort,
};

export const columnShorter = (a:any, b:any, column:any) => {
    const test = Date.parse(a[column.dataIndex]);

    // when column is date
    if (test) {
        let returnData = 0;
        if (Date.parse(a[column.dataIndex]) < Date.parse(b[column.dataIndex])) {
            returnData = -1;
        } else if (
            Date.parse(b[column.dataIndex]) < Date.parse(a[column.dataIndex])
        ) {
            returnData = 1;
        } else {
            returnData = 0;
        }
        return returnData;
    } else if (
        a[column.dataIndex] &&
        b[column.dataIndex] &&
        a[column.dataIndex].length < b[column.dataIndex].length
    ) {
        return -1;
    } else if (
        a[column.dataIndex] &&
        b[column.dataIndex] &&
        b[column.dataIndex].length < a[column.dataIndex].length
    ) {
        return 1;
    } else {
        return 0;
    }
};
