/* eslint-disable no-unused-vars */
import { Input } from "antd";
import type { TextAreaProps } from "antd/lib/input/TextArea";
import type { ChangeEvent } from "react";

interface FormTextAreaProps extends TextAreaProps {
    value?: string;
    getEvent?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    input_class?: string;
}

const { TextArea } = Input;

export const FormTextArea: React.FC<FormTextAreaProps> = ({
    value = "",
    onChange,
    getEvent,
    name,
    ...rest
}) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(event);
        }

        if (getEvent) {
            getEvent(event);
        }
    };

    return (
        <TextArea
            name={name || `input_name`}
            value={value || ""}
            onChange={handleChange}
            autoComplete='off'
            readOnly={!!rest.readOnly}
            placeholder={rest.placeholder || "write here..."}
            disabled={!!rest.disabled}
            id={rest.id || `_uid${Math.random() * 10}`}
            className={rest.input_class ?? `input_textarea`}
            rows={rest.rows || 3}
        />
    );
};

export default FormTextArea;
