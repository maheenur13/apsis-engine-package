import { TimePicker } from "antd";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

import type { TimePickerProps } from "antd";

type FormTimePickerProps = TimePickerProps & {
    value?: string;
    getEvent?: TimePickerProps["onChange"];
    onChange?: TimePickerProps["onChange"];
    name?: string;
    input_class?: string;
};

export const FormTimePicker: FC<FormTimePickerProps> = ({
    value = "",
    onChange,
    getEvent,
    name,
    ...rest
}) => {
    const dateFormat = rest.format ?? "h:mm:ss A";

    const [InputValue, setValue] = useState<Date | null>(null);

    const handleChange = (time: dayjs.Dayjs | null, timeString: string) => {
        if (onChange) {
            onChange(time, timeString);
        }

        if (getEvent) {
            getEvent(time, timeString);
        }
    };

    useEffect(() => {
        setValue(value ? dayjs(value, dateFormat.toString()).toDate() : null);
    }, [dateFormat, name, value]);

    return (
        <TimePicker
            name={name || "date_field"}
            value={InputValue ? dayjs(InputValue) : undefined}
            placeholder={rest.placeholder ?? "HH:mm:ss"}
            onChange={handleChange}
            autoComplete='off'
            disabled={!!rest.disabled}
            id={rest.id || `_uid${Math.random() * 10}`}
            className={rest.input_class ?? "form-control"}
            disabledTime={rest.disabledTime ? rest.disabledTime : undefined}
            {...rest}
        />
    );
};
