/* eslint-disable no-unused-vars */

import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import type { MonthPickerProps, WeekPickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import {  useEffect, useState } from "react";
import type {  FC } from "react";
import { dateMinMaxValidation } from "../../utils";

type FormDatePickerProps = DatePickerProps &
  MonthPickerProps &
  WeekPickerProps & {
    getEvent?: (event: any) => void;
    min?: dayjs.Dayjs;
    max?: dayjs.Dayjs;
    input_class?: string;
    picker?: "date" | "month" | "year";
  };

export const FormDatePicker: FC<FormDatePickerProps> = ({
  value,
  onChange,
  getEvent,
  name,
  picker = "date",
  showTime = false,
  min,
  max,
  ...rest
}) => {
  const dateFormat =
    rest.format || (showTime ? "YYYY D, MMMM h:mm A" : "YYYY-MM-DD");
  const dateFormatHuman =
    rest.format ?? (showTime ? "YYYY D, MMMM h:mm A" : "YYYY-MM-DD");

  const [InputValue, setValue] = useState<dayjs.Dayjs>();

  const handleChange = (date: dayjs.Dayjs | null, dateString: string) => {
    if (!date) {
      setValue(undefined);
      if (onChange) {
        onChange(null, "");
      }

      if (getEvent) {
        const target = { name, value: "" };
        getEvent({ target });
      }
    } else {
      const value = dayjs(date);
      setValue(value);
      if (onChange) {
        onChange(value, dateString);
      }

      if (getEvent) {
        const target = { name, value, date };
        getEvent({ target });
      }
    }
  };

  // data load on edit mode
  useEffect(() => {
    if (value) {
      if (dayjs(value, dateFormat.toString(), true).isValid()) {
        setValue(value);
      } else {
        setValue(dayjs(value));
      }
    } else {
      setValue(undefined);
    }
  }, [dateFormat, name, value]);

  return (
    <>
      <DatePicker
        picker={picker}
        showTime={showTime}
        onChange={handleChange}
        value={InputValue ? dayjs(InputValue) : null}
        disabledDate={
          rest.disabledDate
            ? (current) => dateMinMaxValidation(current, min, max)
            : undefined
        }
        format={rest.format ?? dateFormatHuman}
        id={rest.id || `_uid${Math.random() * 10}`}
        autoComplete="off"
        className={rest.input_class ?? `form-control`}
        {...rest}
      />
    </>
  );
};
