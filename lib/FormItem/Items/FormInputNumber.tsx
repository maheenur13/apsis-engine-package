/* eslint-disable no-unused-vars */
import { InputNumber, InputNumberProps } from "antd";

type ValueType = number | string | null;

type IGetEventType = {
    name: string | undefined;
    value: ValueType;
};

interface FormInputNumberProps extends InputNumberProps {
    getEvent?: (event: { target: IGetEventType }) => void;
    suffix?: string | JSX.Element;
    prefix?: string | JSX.Element;
    input_class?: string;
}

export const FormInputNumber: React.FC<FormInputNumberProps> = ({
    value = "",
    onChange,
    getEvent,
    name,
    type,
    suffix,
    prefix,
    ...rest
}) => {
    const handleChange = (inputVal: ValueType) => {
        if (onChange) {
            onChange(inputVal);
        }

        if (getEvent) {
            const target: IGetEventType = { name, value: inputVal };
            getEvent({ target });
        }
    };

    if (suffix || prefix) {
        return (
            <span className='ant-input-group-wrapper'>
                <span className='ant-input-wrapper ant-input-group'>
                    {prefix && (
                        <span className='ant-input-group-addon'>{prefix}</span>
                    )}
                    <InputNumber
                        name={name || `input_name`}
                        value={
                            typeof value === "number" && !isNaN(value)
                                ? value
                                : undefined
                        }
                        onChange={handleChange}
                        autoComplete='off'
                        readOnly={!!rest.readOnly}
                        disabled={!!rest.disabled}
                        placeholder={rest.placeholder || ""}
                        id={rest.id || `_uid${Math.random() * 10}`}
                        className={
                            rest.input_class ??
                            `form-control w-100 hide-number-arrow`
                        }
                        formatter={(value) =>
                            value
                                ? String(value).replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                  )
                                : ""
                        }
                        parser={(value) =>
                            value ? value.replace(/\$\s?|(,*)/g, "") : ""
                        }
                        {...rest}
                    />
                    {suffix && (
                        <span className='ant-input-group-addon'>{suffix}</span>
                    )}
                </span>
            </span>
        );
    }

    return (
        <InputNumber
            name={name || `input_name`}
            value={
                typeof value === "number" && !isNaN(value) ? value : undefined
            }
            onChange={handleChange}
            autoComplete='off'
            readOnly={!!rest.readOnly}
            disabled={!!rest.disabled}
            placeholder={rest.placeholder || ""}
            id={rest.id || `_uid${Math.random() * 10}`}
            className={
                rest.input_class ?? `form-control w-100 hide-number-arrow`
            }
            formatter={(value) =>
                value ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
            }
            parser={(value) => (value ? value.replace(/\$\s?|(,*)/g, "") : "")}
            {...rest}
        />
    );
};
