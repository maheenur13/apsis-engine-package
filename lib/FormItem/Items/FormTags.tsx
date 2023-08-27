
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

interface FormTagsProps {
  value: string[];
  onChange?: (value: string[]) => void;
  getEvent?: (event: any) => void;
  name?: string;
  slug?: string;
  dropdownOptions?: string[];
  extra?: any;
  placeholder?: string;
  required?: boolean;
}

export const FormTags: React.FC<FormTagsProps> = ({
  value,
  onChange,
  getEvent,
  name,
  slug,
  extra,
  placeholder = 'Please select',
  required,
  ...rest
}) => {
  const { Option } = Select;
  const [options, setOptions] = useState<string[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string[]>(value);

  const handleChange = (value: string[]) => {
    setSelectedValue(value);

    if (onChange) {
      onChange(value);
    }

    if (getEvent) {
      const target = {
        name,
        value,
        rules: { required },
      };
      getEvent({ target });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(slug || ''); // Assuming slug is the URL you want to fetch data from
  
      if (response.ok) {
        const data = await response.json();
        setOptions(data.data);
      } else {
        // Handle error here, e.g., throw an error or show an error message
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle network or other errors here
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (slug && slug !== '') {
      fetchData();
    }
  }, [extra, slug]);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <Select
      mode="tags"
      placeholder={placeholder}
    //   name={name || 'option_name'}
    
      style={{ width: '100%' }}
      onChange={handleChange}
      tokenSeparators={[',']}
      value={selectedValue}
      loading={loading || false}
      {...rest}
    >
      {options &&
        options.map((opt, i) => (
          <Option key={i.toString(36) + i} value={opt}>
            {opt}
          </Option>
        ))}
    </Select>
  );
};

