
import { Col, Input } from "antd";
import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import type { IGridConfigOptions } from "../interfaces/mastergrid";

type PropsType = {
    isRawTable?:boolean;
    gridConfig:IGridConfigOptions;
    setSearchText: Dispatch<SetStateAction<string>>
}

const MastergridCommonSearch:FC<PropsType> = ({isRawTable,gridConfig,setSearchText}) => {

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchText(value);
    };

    return !isRawTable ? (
        <Col span={gridConfig?.filterColumn ? 4 : 8}>
            <div className='mg-search-filter'>
                <Input type='text' onChange={handleSearchInput} />
                <span className='mg-search-icon'>
                    <i className='fa fa-search' />
                </span>
            </div>
        </Col>
    ) : null;
};

export default MastergridCommonSearch;
