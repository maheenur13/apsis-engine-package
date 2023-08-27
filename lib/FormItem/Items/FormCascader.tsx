
import { Cascader, Space } from "antd";
import type { CascaderProps } from "antd";
import {  useEffect, useState } from "react";
import type {  FC } from "react";

interface Option {
    value: string | number;
    label?: React.ReactNode;
    disabled?: boolean;
    children?: Option[];
    isLeaf?: boolean;
}

interface PropsType extends Omit<CascaderProps, "option"> {
    slug: string;
    dropdownOptions?: Option[];
    extra?: any;
    menu_id?: string | number;
    getEvent?: () => void;
    name?:string;
}

export const FormCascader: FC<PropsType> = ({
    value,
    onChange,
    slug,
    dropdownOptions,
    extra,
    menu_id,
    name,
    // getEvent,
    ...rest
}) => {
    const [getCascaderData, { data: cascaderData }] =
        useGetCascaderDataMutation();
    const [options, setOptions] = useState<Option[]>([]);
    const [selectedValue, setSelectedValue] = useState(value);

    function handleChange(value: any[], option: any) {
        setSelectedValue(value);

        if (onChange) {
            onChange(value, option);
        }

        // if (getEvent) {
        //     const target = {
        //         name,
        //         value,
        //     };
        //     getEvent({ target });
        // }
    }

    const fetchData = async () => {
        getCascaderData({
            external_data: extra,
            menu_id: menu_id,
            tree_slug: slug,
        });
    };

    const filter = (inputValue: string, path: any) =>
        path.some(
            (option: any) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
                -1
        );

    useEffect(() => {
        if (cascaderData?.length) {
            setOptions(cascaderData);
        }
    }, [cascaderData]);

    useEffect(() => {
        if (slug && slug != "") {
            fetchData();
        } else if (
            dropdownOptions?.constructor === Array &&
            Object.keys(dropdownOptions)?.length > 0
        ) {
            setOptions(dropdownOptions);
        }

        return () => {
            setSelectedValue([]);
        };
    }, [slug, extra, menu_id, dropdownOptions]);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    return (
        <Space>
            <Cascader
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                value={selectedValue}
                options={options}
                onChange={handleChange}
                placeholder={rest.placeholder || "Please Select a value"}
                changeOnSelect
                disabled={rest.disabled}
                showSearch={{
                    filter,
                }}
            />
        </Space>
    );
};
