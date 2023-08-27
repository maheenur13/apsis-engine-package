
import type { FC } from 'react';
import { useFetchMasterGridData } from '../hooks';
import { Mastergrid } from './Mastergrid';
import { dummyGridData, dummyTitleData } from './constants';
import type { TableProps } from 'antd';
import type { RefTable } from 'antd/es/table/interface';

interface PropsType extends TableProps<RefTable> {
    slug:string;
    handleClick?: any;
    value?:string | number;
    extra?:string;
    headerFixed?:boolean;
    isMultiple?:boolean;
    isSelectable?:boolean;
    primaryKey?:string | number;
    getSelectedRows?:any;
    getSelectedKeys?:any;
    rawTable?:any;
    disableIds?:(string|number)[];
    mode?:any;
    extraButtons?:any;
    getAllValue?:any;
    getAllColumn?:any;
    disableButtons?:any;
    pager?:number[];
    linkView?:boolean;
    actionButtonName?:string;
}

export const MasterGridContainer:FC<PropsType> = ({slug,...rest}) => {
    const {
        fetchGridData,
        fetchTitleData,
        masterGridData,
        isLoading,
        titleData,
      } = useFetchMasterGridData(slug);
      
    return (
        <div>
            <Mastergrid {...rest}  dataLoading={isLoading} fetchGridData={fetchGridData} gridData={masterGridData|| dummyGridData} titleData={titleData ||dummyTitleData} fetchTitleData={fetchTitleData} />
        </div>
    );
};
