/* eslint-disable no-unused-vars */

import { Input, InputProps } from "antd";
import { ChangeEvent, FC } from "react";

interface PropsType extends InputProps {
    getEvent?: (event: ChangeEvent<HTMLInputElement>) => void;
    input_class?: string;
}

export const FormInput: FC<PropsType> = ({
    value = "",
    onChange,
    getEvent,
    name,
    type = "text",
    suffix,
    prefix,
    ...rest
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event);
        }

        if (getEvent) {
            getEvent(event);
        }
    };

    if (suffix || prefix) {
        return (
            <span className='ant-input-group-wrapper'>
                <span className='ant-input-wrapper ant-input-group'>
                    {prefix && (
                        <span className='ant-input-group-addon'>{prefix}</span>
                    )}
                    <Input
                        name={name || `input_name`}
                        type={type}
                        value={value}
                        onChange={handleChange}
                        autoComplete='off'
                        readOnly={!!rest.readOnly}
                        disabled={!!rest.disabled}
                        placeholder={rest.placeholder || ""}
                        id={rest.id || `_uid${Math.random() * 10}`}
                        className={rest.input_class ?? `form-control`}
                    />
                    {suffix && (
                        <span className='ant-input-group-addon'>{suffix}</span>
                    )}
                </span>
            </span>
        );
    }

    return (
        <>
            <Input
                name={name || `input_name`}
                type={type}
                value={value}
                onChange={handleChange}
                autoComplete='off'
                readOnly={!!rest.readOnly}
                disabled={!!rest.disabled}
                placeholder={rest.placeholder || ""}
                id={rest.id || `_uid${Math.random() * 10}`}
                className={rest.input_class ?? `form-control`}
            />
        </>
    );
};
