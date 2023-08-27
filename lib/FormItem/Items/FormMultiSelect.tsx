
import React, { Fragment, useEffect, useState } from 'react';
import { MultiSelect as MultiSelector } from 'react-multi-select-component';
import type { Option, SelectProps } from 'react-multi-select-component';

interface FormMultiSelectProps extends SelectProps {
  onChange?: (value: (string | number)[]) => void;
  getEvent?: (event: any) => void;
  name?: string;
  slug?: string;
  dropdownOptions?: string;
  extra?: any; // Replace 'any' with a specific type if possible
  required?: boolean;
}

const MultiSelect: React.FC<FormMultiSelectProps> = ({
  value,
  onChange,
  getEvent,
  name,
  slug,
  dropdownOptions,
  extra,
  options,
  labelledBy,
  ...rest
}: FormMultiSelectProps) => {
  const [selectOption, setSelectOptions] = useState<Option[]>(options);
  const [selected, setSelected] = useState<{ label: string; value: string | number }[]>([]);

  const handleChange = (select: { label: string; value: string | number }[]) => {
    // set state for this component
    setSelected(select);

    // send to parent component
    if (onChange) {
      onChange(select.map((item) => item.value));
    }

    if (getEvent) {
      const target = {
        name,
        value: select.map((item) => item.value),
        selectedItem: select,
        rules: { required: rest?.required },
      };

      getEvent({ target });
    }
  };

  const getOptionsField = async () => {
    const response = await fetchWrapper.post('dropdown/dropdowndata', {
      dropdown_slug: slug,
      external_data: extra,
    });

    const optionsItem = response.data ? response.data : [];
    setSelectOptions(optionsItem);
  };

  useEffect(() => {
    // set selected
    const selectedValues: { label: string; value: string | number }[] = [];
    if (Array.isArray(value)) {
        selectOption.forEach(function (item) {
        if (value?.includes(item.value)) selectedValues.push(item);
      });
    }
    //  else if (typeof value === 'string') {
    //   const newValue = value.split(',').map((item) => (/^\d+$/.test(item) ? Number(item) : item));
    //   options.forEach(function (item) {
    //     if (newValue?.includes(item.value)) selectedValues.push(item);
    //   });
    // }
    setSelected(selectedValues);
  }, [selectOption, value]);

  useEffect(() => {
    if (slug && slug !== '') {
      getOptionsField();
    } else if (dropdownOptions && dropdownOptions !== '') {
      const optionItems = JSON.parse(dropdownOptions);
      setSelectOptions(optionItems);
    }
    return () => {
      setSelected([]);
    };
  }, [extra, dropdownOptions]);

  return (
    <Fragment>
      <MultiSelector
        options={selectOption}
        value={selected}
        onChange={handleChange}
        labelledBy={labelledBy || 'Select'}
        {...rest}
      />
    </Fragment>
  );
};

export const FormMultiSelect = React.memo(MultiSelect);
