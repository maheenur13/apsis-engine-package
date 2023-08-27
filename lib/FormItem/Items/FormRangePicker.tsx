import { DatePicker, Space } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import type { RangeValue } from "rc-picker/lib/interface";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
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

type FormRangePickerProps = RangePickerProps & {
  getEvent?: (event: any) => void;
  name?: string;
  showRanges?: boolean;
  value?: RangeValue<dayjs.Dayjs> | string;
};

export const FormRangePicker: React.FC<FormRangePickerProps> = ({
  onChange,
  getEvent,
  name,
  value,
  ...rest
}: FormRangePickerProps) => {
  const dateFormat = rest.format ?? "YYYY-MM-DD";
  const [dateRange, setDateRange] = useState<
    RangeValue<dayjs.Dayjs> | undefined
  >();

  const handleChange = (
    dates: RangeValue<Dayjs>,
    dateStrings: [string, string]
  ) => {
    let newValue: RangeValue<dayjs.Dayjs> | undefined = [dayjs(), dayjs()];

    if (dates && dates.length === 2) {
      const val1 = dates[0];
      const val2 = dates[1];
      newValue = [
        dayjs(val1, dateFormat as string),
        dayjs(val2, dateFormat as string),
      ];
    }

    setDateRange(newValue);

    if (onChange) {
      onChange(newValue, dateStrings);
    }

    if (getEvent) {
      const target = { name, value: newValue };
      getEvent({ target });
    }
  };

  // data load on edit mode
  useEffect(() => {
    if (Array.isArray(value) && value.length === 2) {
      setDateRange(value);
    } else if (typeof value === "string") {
      const newValue = value?.split(",");
      if (newValue && newValue.length === 2) {
        setDateRange([
          dayjs(newValue[0], dateFormat as string),
          dayjs(newValue[1], dateFormat as string),
        ]);
      }
    }
  }, [value]);

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        onChange={handleChange}
        value={dateRange}
        presets={rangePresets}
        autoComplete="Off"
        format={["DD-MM-YYYY", dateFormat as string]}
        {...rest}
      />
    </Space>
  );
};

