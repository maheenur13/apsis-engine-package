/* eslint-disable no-unused-vars */
import { TreeSelect, TreeSelectProps } from "antd";
import { ReactNode, useEffect, useState } from "react";
// import fetchWrapper from '@/apsisEngine/helpers/fetchWrapper';
import { OptionItem } from "@/engine/interfaces/formtreeselect.interfaces";
import { useGetDropdownDataMutation } from "@/features/engine/dropdown/dropdown-api";
import { ChangeEventExtra } from "rc-tree-select/lib/TreeSelect";
import { treeData } from "./constants";

const { SHOW_CHILD } = TreeSelect;

interface FormTreeSelectProps extends TreeSelectProps {
    getEvent?: (event: any) => void;
    name?: string;
    slug: string;
    dropdownOptions?: string;
    placeholder?: string;
    extra?: any;
    required?: boolean;
    value?: string;
}

export const FormTreeSelect: React.FC<FormTreeSelectProps> = ({
    onChange,
    getEvent,
    name,
    slug,
    dropdownOptions,
    placeholder,
    extra,
    value,

    ...rest
}) => {
    const [selected, setSelected] = useState<string[]>();
    const [options, setOptions] = useState<OptionItem[]>(treeData);
    const [getDropdownData, { data: dropdownData, isError }] =
        useGetDropdownDataMutation();

    const handleChange = (
        select: string[],
        labelList: ReactNode[],
        extra: ChangeEventExtra
    ) => {
        setSelected(select);
        if (onChange) {
            onChange(select, labelList, extra);
        }
        if (getEvent) {
            const target = {
                name,
                value: select.map((item) => item),
                selectedItem: select,
                rules: { required: rest?.required },
            };
            getEvent({ target });
        }
    };

    useEffect(() => {
        if (slug && slug !== "") {
            getDropdownData({ dropdown_slug: slug, external_data: extra });
        }
    }, [extra, slug]);

    useEffect(() => {
        if (!isError && dropdownData) {
            setOptions(dropdownData.data);
        } else if (dropdownOptions && dropdownOptions !== "") {
            const options = JSON.parse(dropdownOptions) as OptionItem[];
            setOptions(options);
        }
    }, [dropdownData, dropdownOptions]);

    useEffect(() => {
        if (value?.length) {
            setSelected([value]);
        }
    }, [value]);

    return (
        <TreeSelect
            value={selected}
            showArrow
            allowClear
            onChange={handleChange}
            treeData={options}
            treeCheckable
            showCheckedStrategy={SHOW_CHILD}
            placeholder={"Please select"}
            style={{ width: "100%" }}
            {...rest}
        />
    );
};
