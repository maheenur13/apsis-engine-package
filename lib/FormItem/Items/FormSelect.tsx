
import { Select  } from 'antd';
import type { SelectProps  } from 'antd';
import React, { useEffect, useState } from 'react';

interface OptionItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface FormSelectProps extends SelectProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  getEvent?: (event: any) => void;
  name?: string;
  slug: string;
  dropdownOptions?: string;
  extra?: any;
  disabledOptions?: (string | number)[];
  placeholder?: string;
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  value = '',
  onChange,
  getEvent,
  name,
  slug,
  dropdownOptions,
  extra,
  disabledOptions = [],
  ...rest
}: FormSelectProps) => {
  const { Option } = Select;
  const [options, setOptions] = useState<OptionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(value);

  const handleChange = (value: string | number) => {
    setSelectedValue(value);

    if (onChange) {
      onChange(value);
    }

    if (getEvent) {
      const selectedItem = options ? options.filter((item) => item.value == value) : [];
      const target = {
        name,
        value,
        rules: { required: rest?.required },
        selectedItem,
      };
      getEvent({ target });
    }
  };

  const toObject = (data: string[]) => {
    const result: OptionItem[] = [];
    for (let i = 0; i < data.length; ++i) {
      const obj: OptionItem = {
        label: data[i]!,
        value: data[i]!,
      };
      result.push(obj);
    }
    return result;
  };

  const fetchData = async () => {
    setLoading(true);
    if (slug?.indexOf(',') > -1) {
      const options = toObject(slug.split(','));
      setOptions(convertOptions(options));
    } else {
      const response = await fetchWrapper.post('dropdown/dropdowndata', {
        dropdown_slug: slug,
        external_data: extra,
      });

      if (!response.error && response.data) {
        setOptions(convertOptions(response.data));
        if (response.data.length === 1) {
          handleChange(response.data[0].value);
        }
      }
    }
    setLoading(false);
  };

  const convertOptions = (opts: OptionItem[]) => {
    const oldValues = [...opts];
    return oldValues.map((item) => ({
      ...item,
      disabled: disabledOptions.includes(item.value),
    }));
  };

  useEffect(() => {
    if (slug && slug != '') {
      fetchData();
    } else if (dropdownOptions && dropdownOptions != '') {
      const options = JSON.parse(dropdownOptions);
      setOptions(convertOptions(options));
    }
  }, [extra, dropdownOptions, slug]);

  useEffect(() => {
    setSelectedValue(/^\d+$/.test(String(value)) ? Number(value) : value);
  }, [value]);

  useEffect(() => {
    disabledOptions.length > 0 &&
      options.length > 0 &&
      setOptions(convertOptions(options));
  }, [disabledOptions]);

  return (
    <Select
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      showSearch
      allowClear
      placeholder={rest.placeholder ?? 'Please select'}
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={(input, option) =>
        option?.children ? option.children.toString().indexOf(input.toLowerCase())! >= 0 : false
      }
      value={selectedValue}
      loading={loading ?? false}
      {...rest}
    >
      {options?.map((opt, i) => (
        <Option
          disabled={opt.disabled}
          key={i.toString(36) + i}
          value={/^\d+$/.test(String(opt.value)) ? Number(opt.value) : opt.value}
        >
          {opt.label || ''}
        </Option>
      ))}
    </Select>
  );
};


