import { DatePicker, Space } from "antd";
import type { RangePickerProps } from "antd/es/date-picker/generatePicker";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { RangeValue } from "rc-picker/lib/interface";
import {  useEffect, useState } from "react";
import type { FC } from "react";
const { RangePicker } = DatePicker;

const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
}[] = [
    { label: "Today", value: [dayjs(), dayjs()] },
    {
        label: "Yesterday",
        value: [dayjs().add(-1, "d"), dayjs()],
    },
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];

// eslint-disable-next-line no-unused-vars
type GetEventFunctionType = (event: { target: { value: string[] } }) => void;

type FormRangePickerProps = RangePickerProps<dayjs.Dayjs> & {
    getEvent?: GetEventFunctionType;
};

export const FormDateRangePicker: FC<FormRangePickerProps> = ({
    onChange,
    value,
    getEvent,
    
    ...rest
}) => {
    const dateFormat = rest.format ?? "YYYY-MM-DD";
    const [selectedValue, setSelectedValue] = useState<
        RangeValue<dayjs.Dayjs> | undefined
    >(undefined);

    const handleChange = (
        dates: RangeValue<Dayjs>,
        dateStrings: [string, string]
    ) => {
        setSelectedValue([
            dayjs(dateStrings[0] || undefined, dateFormat as string),
            dayjs(dateStrings[1] || undefined, dateFormat as string),
        ]);
        if (onChange) {
            onChange(dates, dateStrings);
        }
        if (getEvent) {
            const target = { value: dateStrings };
            getEvent({ target });
        }
    };

    useEffect(() => {
        if (value && value.length === 2) {
            setSelectedValue(value);
        }
    }, [value]);

    return (
        <Space direction='vertical' size={12}>
            <RangePicker
                presets={rangePresets}
                onChange={handleChange}
                autoComplete='off'
                format={["YYYY-MM-DD", dateFormat as string]}
                defaultValue={selectedValue}
                {...rest}
            />
        </Space>
    );
};
