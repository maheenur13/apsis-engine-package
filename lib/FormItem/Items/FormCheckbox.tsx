import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps, CheckboxValueType } from 'antd/es/checkbox/Group';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface FormCheckboxProps  extends CheckboxGroupProps {
  value?: CheckboxValueType[];
  onChange?: (checkedValue: CheckboxValueType[] ) => void;
  getEvent?: (event: any) => void;
  name?: string;
  slug?: string;
  checkBoxOptions?: string | any[];
  extra?: any;
  disabled?: boolean;
  id?: string;
  required?:boolean;
  direction?: 'horizontal' | 'vertical';
  type:string;
  checkBoxStyle?:React.CSSProperties | undefined;
  label?:string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  value,
  onChange,
  getEvent,
  name,
  slug,
  checkBoxOptions,
  extra,
  ...rest
}) => {
  const [options, setOptions] = useState<any[]>();
  const [selectedValue, setSelectedValue] = useState<CheckboxValueType[] | undefined>();
  const [checked, setChecked] = useState(false);

  // handle Multiple
  const handleChange = (checkedValue: CheckboxValueType[]) => {
    // set form values
    if (onChange) {
      onChange(checkedValue);
    }

    // set state values
    setSelectedValue(checkedValue);

    // return data
    if (getEvent) {
      getEvent({ target: { name, value: checkedValue } });
    }
  };

  // handle single
  const handleSingle = (e: CheckboxChangeEvent) => {
    // set single checkbox checked
    setChecked(e.target.checked);

    // set form values
    if (onChange) {
      if (e.target.checked) {
        onChange(options?.[0]?.value || '');
      } else {
        
      }
    }

    // return data
    if (getEvent) {
      if (e.target.checked) {
        getEvent({ target: { name, value: options?.[0]?.value || '' } });
      } else {
        getEvent({ target: { name, value: '' } });
      }
    }
  };

  // fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/dropdown/dropdowndata`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dropdown_slug: slug,
          external_data: extra,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setOptions(data.data);
      } else {
       
      }
    } catch (error) {
     
    }
  };

  // setOptions
  useEffect(() => {
    const initializeOptions = async () => {
      if (slug && slug !== '') {
        await fetchData();
      } else if (checkBoxOptions && checkBoxOptions !== '') {
        if (typeof checkBoxOptions === 'string') {
          setOptions(JSON.parse(checkBoxOptions));
        } else {
          setOptions(checkBoxOptions);
        }
      }
    };
    initializeOptions();
  }, [checkBoxOptions, name, slug]);

  // data load on edit mode
  useEffect(() => {
    const loadEditModeData = async () => {
      if (options && options.length > 1) {
         setSelectedValue(value);
      } else if (options && value === options[0]?.value) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    };
    loadEditModeData();
  }, [options, value]);

  if (options && options.length > 1) {
    return (
      <Checkbox.Group
        name={name || `input_name`}
        options={options}
        value={selectedValue}
        onChange={handleChange}
        disabled={!!rest.disabled}
        children={rest.children}
        defaultValue={rest.defaultValue}
        style={rest.style}
        // id={rest.id || `_uid${Math.random() * 10}`}
        className={`${rest.direction ? rest.direction : 'horizontal'}`}
      />
    );
  } else {
    return (
      <React.Fragment>
        {options && (
          <Checkbox
            name={name || `input_name`}
            onChange={handleSingle}
            checked={checked}
            disabled={!!rest.disabled}
            type={rest.type}
            id={rest.id || `_uid${Math.random() * 10}`}
            style={rest.checkBoxStyle}
          >
            {options[0]?.label}
          </Checkbox>
        )}
      </React.Fragment>
    );
  }
};

