import { Col } from "antd";
import type { FC } from "react";
import { styled } from "styled-components";


type PropsType = {
  gridConfig: any;
};

const MastergridFilter: FC<PropsType> = ({ gridConfig }) => {
  // const { gridConfig } = useSelector(getMastergridState);
  return gridConfig?.filter_column ? (
    <Col span={4}>
      <FilterSearch>
        {/* <FormItem
                    value={filterColumn?.value}
                    field={{
                        input_type: "multi_select",
                        dropdown_options: JSON.stringify(filterColumn?.options),
                        element_column: 24,
                    }}
                    getEvent={filterHandleChange}
                /> */}
      </FilterSearch>
    </Col>
  ) : null;
};

export default MastergridFilter;

const FilterSearch = styled.div`
  .dropdown-container {
    z-index: 999;
  }
  .ant-form-item {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 0;
  }
`;