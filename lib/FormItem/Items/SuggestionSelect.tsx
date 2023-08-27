import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';

interface SuggestionSelectProps {
  value?: string | null;
  getEvent?: (event: any) => void;
  slug: string;
  placeholder: string;
  disabledOptions?: string[];
  onChange?: (value: string) => void;
  extra?: any; // Replace with actual type
  name?: string;
  disabled?:boolean;
}

export const SuggestionSelect: React.FC<SuggestionSelectProps> = ({
  value,
  getEvent,
  slug,
  placeholder,
  disabledOptions = [],
  onChange,
  extra,
  name,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);

  const convertOptions = (opts: any[]) => {
    const oldValues = [...opts];
    return oldValues.map((item) => ({ ...item, disabled: disabledOptions.includes(item.value) }));
  };

  const changeHandler = (value: string) => {
    const selectedItem = options ? options.find((item) => item.value === value) : undefined;
    if (getEvent) {
      const target = {
        name,
        value,
        selectedItem,
      };
      getEvent({ target });
    }
    if (onChange) {
      onChange(value);
    }
    setSelectedValue(selectedItem?.label ?? value);
  };

  // fetch data
  const fetchData = async () => {
    const response = await fetchWrapper.post('dropdown/dropdowndata', {
      dropdown_slug: slug,
      external_data: extra,
    });

    if (!response.error && response.data) {
      setOptions(convertOptions(response.data));
      setFilteredOptions(convertOptions(response.data));
      if (response.data.length === 1) {
        changeHandler(response.data[0].value);
      }
    }
  };

  useEffect(() => {
    if (slug && slug !== '') {
      fetchData();
    }
  }, [extra, slug]);

  useEffect(() => {
    value &&
      setTimeout(() => {
        setSelectedValue(value);
      }, 100);
  }, [value]);

  return (
    <AutoComplete
      options={filteredOptions.map((item) => ({ value: item.value, label: item.label }))}
      value={selectedValue}
      onChange={changeHandler}
      onSearch={(text) =>
        setFilteredOptions(
          options.filter((item) => item.label.toLowerCase().includes(text.toLowerCase()))
        )
      }
      placeholder={placeholder}
      {...rest}
    />
  );
};
