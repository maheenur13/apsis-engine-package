
import type { DatePickerProps as AntdDatePickerProps } from 'antd';
import { DatePicker as DatePick } from 'antd';

export type DatePickerProps =  & AntdDatePickerProps;

export function DatePicker(props: DatePickerProps) {
  return  <DatePick {...props} />;
}
