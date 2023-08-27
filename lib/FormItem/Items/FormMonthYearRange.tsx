import { DatePicker, Space } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import type { RangeValue } from "rc-picker/lib/interface";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

type FormMonthYearRangeProps = RangePickerProps & {
  getEvent?: (event: any) => void;
  name?: string;
  type?: "month_range" | "year_range";
};

export const FormMonthYearRange: React.FC<FormMonthYearRangeProps> = ({
  value,
  onChange,
  getEvent,
  name,
  type,
  ...rest
}: FormMonthYearRangeProps) => {
  const format = type === "month_range" ? "YYYY-MM" : "YYYY";
  const [range, setRange] = useState<RangeValue<dayjs.Dayjs> | undefined>(value);

  const handleChange = (
    dates: RangeValue<Dayjs>,
    dateStrings: [string, string]
  ) => {
    if (dates) {
      const values: RangeValue<dayjs.Dayjs> = [
        dayjs(dates[0], format as string),
        dayjs(dates[1], format as string),
      ];
      setRange(values);

      if (onChange) {
        onChange(values, dateStrings);
      }

      if (getEvent) {
        const target = { name, value };
        getEvent({ target });
      }
    }
  };

  // data load on edit mode
  useEffect(() => {
    if (value && value.length > 0) {
      const rangeValue: RangeValue<dayjs.Dayjs> = [
        dayjs(value[0]),
        dayjs(value[1]),
      ];
      setRange(rangeValue);
    }
  }, [value]);

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        autoComplete="Off"
        picker={type === "month_range" ? "month" : "year"}
        format={format}
        onChange={handleChange}
        value={range}
        
        {...rest}
      />
    </Space>
  );
};
