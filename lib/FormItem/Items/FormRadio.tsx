
import { Radio, Space } from 'antd';
import type { RadioChangeEvent, RadioGroupProps } from 'antd';
import React, { useEffect, useState } from 'react';

interface FormRadioProps extends RadioGroupProps {
  getEvent?: (event: any) => void;
  slug?: string;
  radioOptions?: string | any[]; // Replace 'any' with a specific type if possible
  extra?: any; // Replace 'any' with a specific type if possible
  id?: string;
  direction?: 'vertical' | 'horizontal';
}

export const FormRadio: React.FC<FormRadioProps> = ({
  value,
  onChange,
  getEvent,
  name,
  slug,
  radioOptions,
  extra,
  ...rest
}: FormRadioProps) => {
  const [options, setOptions] = useState<any[] | undefined>();
  const [checkedValue, setCheckedValue] = useState<string | number | null>();

  const handleChecked = (e: RadioChangeEvent) => {
    // set form values
    if (onChange) {
      onChange(e.target.value);
    }

    // return data
    if (getEvent) {
      getEvent({ target: { name, value: e.target.value } });
    }
  };

  // fetch data
  const fetchData = async () => {
    const response = await fetchWrapper.post('dropdown/dropdowndata', {
      dropdown_slug: slug,
      external_data: extra,
    });
    if (!response.error && response.data) {
      setOptions(response.data);
    }
  };

  // setOptions
  useEffect(() => {
    const setRadioOptions = async () => {
      if (slug && slug !== '') {
        await fetchData();
      } else if (radioOptions && radioOptions !== '') {
        if (typeof radioOptions === 'string') {
          setOptions(JSON.parse(radioOptions));
        } else {
          setOptions(radioOptions);
        }
      }
    };
    setRadioOptions();
  }, [radioOptions, name, slug]);

  // data load on edit mode
  useEffect(() => {
    setCheckedValue(value);
  }, [options, value]);

  return (
    <Radio.Group
      onChange={handleChecked}
      value={checkedValue}
      name={name || `input_name`}
      disabled={!!rest.disabled}
      id={rest.id || `_uid${Math.random() * 10}`}
      defaultValue={rest.defaultValue ?? null}
      {...rest}
    >
      <Space direction={rest.direction || 'horizontal'}>
        {options &&
          options.length > 0 &&
          options.map((item, index) => {
            return (
              <Radio value={item?.value} key={`radio_${index}_${item?.value}`}>
                {item?.label}
              </Radio>
            );
          })}
      </Space>
    </Radio.Group>
  );
};

