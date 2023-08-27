import styled from "styled-components";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type {FC} from 'react';
import { Form, Button, Row } from 'antd';
import { MultiSelect } from "react-multi-select-component";

interface SearchComponentProps {
    slug: string;
    callFrom: string;
    searchConfig: any; // Replace with the actual type
    setQuery: (query: any) => void;
    defaultSearchValues?: any[]; // Replace with the actual type
    defaultSearchItems?: any[]; // Replace with the actual type
    getActiveFieldIds: (activeFieldIds: number[]) => void;
    btnName: string;
    showFilterBtn?: boolean;
    extraConditions?: any; // Replace with the actual type
  }

const MastergridSearchPanel:FC<SearchComponentProps> = (props) => {
    const {
        slug,
        callFrom,
        searchConfig,
        setQuery,
        defaultSearchValues = [],
        defaultSearchItems = [],
        getActiveFieldIds,
        btnName,
        showFilterBtn = true,
        extraConditions,
        ...restProps
      } = props;

      const [inputFields, setInputFields] = useState<any[]>([]);
    const [selected, setSelected] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [options, setOptions] = useState<any[]>([]);
    const [panels, setPanels] = useState<any>({});
    const [initialValues, setInitialValues] = useState<any>();
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        filter: () => {
          form.submit();
        },
      }));
  
      const handleFields = (select: any[]) => {
        setSelected(select);
  
        const valueArr = select.map((item) => {
          return item.value.toString();
        });
  
        fieldFilter(panels, valueArr, false);
      };
  
      const fieldFilter = (
        data: any,
        selectItem: string[],
        checkDefault = true
      ) => {
        if (!data) return;
  
        const modifiedSelectedItem = checkDefault
          ? [...new Set([...selectItem, ...defaultSearchItems])]
          : [...new Set([...selectItem])];
  
        const search_fields = data.search_fields ?? [];
        const optionArr: any[] = [];
  
        search_fields.forEach(function (item: any) {
          const optItem = {
            label: item.label_name,
            value: item.search_panel_detail_id.toString(),
          };
  
          optionArr.push(optItem);
        });
  
        setOptions(optionArr);
  
        const selectedArr: any[] = [];
        search_fields.forEach(function (item: any) {
          const optItem = {
            label: item.label_name,
            value: item.search_panel_detail_id.toString(),
          };
          if (modifiedSelectedItem.includes(item.search_panel_detail_id.toString())) {
            selectedArr.push(optItem);
          }
        });
  
        setSelected(selectedArr);
  
        showSelectFields(data, modifiedSelectedItem);
      };
  
      const showSelectFields = (data: any, selectItem: string[]) => {
        const search_fields = data.search_fields;
        const renderSwitch = (param: string) => {
          switch (param) {
            case 'WHERE LIKE':
              return 'WH-LK-';
            case 'WHERE EQUAL':
              return 'WH-EQ-';
            case 'WHERE TIME':
              return 'WH-TM-';
            case 'WHERE IN':
              return 'WH-IN-';
            case 'WHERE DATERANGE':
              return 'WH-DR-';
            case 'WHERE DATETIME':
              return 'WH-DT-';
            case 'WHERE RANGE':
              return 'WH-RG-';
            case 'HAVING LIKE':
              return 'HV-LK-';
            case 'HAVING EQUAL':
              return 'HV-EQ-';
            case 'HAVING IN':
              return 'HV-IN-';
            case 'HAVING DATERANGE':
              return 'HV-DR-';
            case 'HAVING DATETIME':
              return 'HV-DT-';
            case 'HAVING RANGE':
              return 'HV-RG-';
            default:
              return 'WH-LK-';
          }
        };
  
        const fields: any[] = [];
        const activeFieldIds: number[] = [];
        for (const [, cl] of search_fields.entries()) {
          const item = {
            input_type: cl?.input_type,
            label_name: cl?.label_name,
            input_name:
              data.prefix === true
                ? renderSwitch(cl?.input_operation_type) + cl?.input_name
                : cl?.input_name,
            value: cl?.input_default_val ?? '',
            element_column: String(cl?.column_space),
            input_class: cl?.input_class,
            input_id: cl?.input_id,
            dropdown_slug: cl?.dropdown_slug,
            multiple: String(cl?.multiple || 0),
            input_placeholder: cl?.input_placeholder,
            dropdown_options: cl?.dropdown_options,
            input_label: cl?.input_label,
            input_value: cl?.input_value,
            required: cl?.required,
            disabled: cl?.disabled,
          };
  
          const { input_name, value } = item;
  
          setInitialValues((prev) => {
            return { ...prev, [input_name]: value };
          });
  
          if (selectItem.includes(String(cl?.search_panel_detail_id))) {
            fields.push(item);
            activeFieldIds.push(cl.search_panel_detail_id);
          }
        }
        getActiveFieldIds && getActiveFieldIds(activeFieldIds);
        setInputFields(fields);
      };
  
      const onFinish = (values: any) => {
        if (values) {
          const search_data: any[] = [];
          for (const [name, value] of Object.entries(values)) {
            search_data.push({ name, value: value ?? '' });
          }
          if (setQuery) setQuery(search_data);
        } else {
          if (setQuery) setQuery(false);
        }
      };
  
      const getSearchFields = async () => {
        try {
          const response = await fetchWrapper.get(`master-grid/search-panel/${slug}`);
          if (!response?.error) {
            const searchData = response.data;
            setPanels(searchData);
            const selectedValue =
              searchData.session_filter && searchData.session_filter !== ''
                ? searchData.session_filter.split(',').map((iNum) => iNum)
                : [];
  
            if (defaultSearchValues) {
              defaultSearchValues?.forEach((defaultSearch) => {
                searchData?.search_fields.forEach((field) => {
                  if (field?.input_name == Object.keys(defaultSearch)[0]) {
                    field.input_default_val = Object.values(defaultSearch)[0];
                  }
                });
              });
            }
  
            fieldFilter(searchData, selectedValue);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const checkDefaultValues = (inputFields: any[]) => {
        const values: any[] = [];
        inputFields?.map((item) => item?.value && values.push(item.value));
        if (count === 0 && inputFields?.length > 0) {
          setCount((prev) => prev + 1);
          form.submit();
        }
      };
  
      const getExtraData = (input_name: string) => {
        try {
          const inputName = input_name?.split('-')?.slice(-1)[0] ?? null;
          const extraValue = inputName ? extraConditions[inputName.trim()] : '';
          return extraValue;
        } catch (error) {
          return '';
        }
      };
  
      useEffect(() => {
        if ((callFrom == 'grid' || callFrom == 'master') && searchConfig) {
          const selectedValue =
            searchConfig.session_filter && searchConfig.session_filter !== ''
              ? searchConfig.session_filter.split(',').map((iNum) => iNum)
              : [];
  
          if (defaultSearchValues) {
            defaultSearchValues.forEach((defaultSearch) => {
              searchConfig.search_fields.forEach((field) => {
                if (field.input_name == Object.keys(defaultSearch)[0]) {
                  field.input_default_val = Object.values(defaultSearch)[0];
                }
              });
            });
          }
  
          fieldFilter(searchConfig, selectedValue);
          setPanels(searchConfig);
        } else if (slug && slug != '') {
          getSearchFields();
        }
      }, [slug]);
  
      useEffect(() => {
        if (defaultSearchValues.length > 0 && count === 0) {
          setCount((prev) => prev + 1);
          const valueTimeouts = setTimeout(() => {
            form.submit();
          }, 10);
          return () => {
            clearTimeout(valueTimeouts);
          };
        }
      }, [defaultSearchValues]);
  
      useEffect(() => {
        checkDefaultValues(inputFields);
      }, [inputFields]);

    return (
        <>
           <SearchWrapper>
        <div className={`sa-wrapper ${callFrom}`}>
          <div className="sa-field-handler">
            <span className="sa-options-label">
              <i className="fa fa-search"></i> Select filter:
            </span>

            <MultiSelect
              options={options}
              value={selected}
              onChange={handleFields}
              labelledBy="Select"
            />
          </div>

          {inputFields && inputFields.length > 0 && (
            <Form form={form} onFinish={onFinish} initialValues={initialValues} className="mg-search-panel">
              <Row gutter={16}>
                {inputFields &&
                  inputFields.map((field, index) => {
                    return (
                      <FormItem
                        key={`${field.input_name}_${index}`}
                        field={{ ...field, extra: getExtraData(field.input_name) ?? '' }}
                      />
                    );
                  })}
              </Row>
              {showFilterBtn && (
                <Button className="mb-3" type="primary" onClick={() => form.submit()}>
                  {btnName || 'Filter Now'}
                </Button>
              )}
            </Form>
          )}
        </div>
      </SearchWrapper>
        </>
    );
};

export default MastergridSearchPanel;


const SearchWrapper = styled.div`
	.sa-wrapper {
		position: relative;
		.sa-field-handler {
			position: relative;
			right: auto;
			left: 0;
			display: block;
			align-items: center;
			max-width: 320px;
			.multi-select {
				.dropdown-content {
					z-index: 999;
				}
				.dropdown-heading {
					padding-left: 120px;
					max-width: 250px;
					width: 250px;
					height: 30px;
				}
			}
			.sa-options-label {
				-moz-transform: translateX(10px);
				-webkit-transform: translateX(10px);
				-o-transform: translateX(10px);
				-ms-transform: translateX(10px);
				transform: translateX(10px);
				position: absolute;
				left: 0;
				top: 3px;
				z-index: 1;
				pointer-events: none;
			}
		}
		&.grid .sa-field-handler {
			position: absolute;
			right: 30px;
			left: auto;
			top: -50px;
			display: flex;
			align-items: center;
			max-width: none;
			.sa-options-label {
				-moz-transform: translateX(110px);
				-webkit-transform: translateX(110px);
				-o-transform: translateX(110px);
				-ms-transform: translateX(110px);
				transform: translateX(110px);
				position: relative;
				z-index: 1;
				left: 0;
				top: 0;
				pointer-events: none;
			}
		}
		&.master {
			.sa-field-handler {
				position: absolute;
				right: 10px;
				left: auto;
				top: -40px;
				display: flex;
				align-items: center;
				max-width: none;
				.sa-options-label {
					-moz-transform: translateX(110px);
					-webkit-transform: translateX(110px);
					-o-transform: translateX(110px);
					-ms-transform: translateX(110px);
					transform: translateX(110px);
					position: relative;
					z-index: 1;
					left: 0;
					top: 0;
					pointer-events: none;
				}
			}
			.ant-form {
				padding: 10px 15px 0;
				border-bottom: 1px solid #e3e3e3;
				background: #fff;
			}
		}
		&.external {
			.sa-field-handler {
				display: flex;
				align-items: center;
				max-width: none;
			}
			.ant-form {
				margin-top: 10px;
				padding: 10px 15px 0;
				border-bottom: 1px solid #e3e3e3;
				background: #fff;
			}
		}
		.mg-search-panel {
			.multi-select {
				.dropdown-content {
					z-index: 1000;
				}
			}
		}
	}
`;
