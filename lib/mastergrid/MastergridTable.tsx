import { Spin, Table } from "antd";
import type { TablePaginationConfig } from "antd";
import type { Dispatch, FC, SetStateAction } from "react";
import { onlyUnique } from "../utils/mastergrid";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { IGridConfigOptions } from "../interfaces/mastergrid";

type PropsType = {
  loading: boolean;
  gridConfig: any;
  selectedIds: any[];
  selectedData: any[];
  curInstanceIds: any;
  disableIds: any[];
  isRawTable: boolean;
  columns: any;
  data: any;
  setSelectedIds: Dispatch<SetStateAction<any[]>>;
  setSelectedData: Dispatch<any>;
  setGridConfig: Dispatch<SetStateAction<IGridConfigOptions>>;
};

const MastergridTable: FC<PropsType> = ({
  loading,
  gridConfig,
  selectedIds,
  selectedData,
  curInstanceIds,
  disableIds,
  isRawTable,
  columns,
  data,
  setSelectedIds,
  setSelectedData,
  setGridConfig,
}) => {
  const rowSelection = {
    getCheckboxProps: (record: any) => ({
      disabled: disableIds ? disableIds.includes(record.key) : false,
      key: record.key,
    }),

    onChange: (selectedRowKeys: any, selectedRows: any) => {
      let newSelectedIds = [];
      let newSelectedData = [];
      const selectItem = selectedRowKeys.map(function (item: any) {
        return String(item);
      });
      if (gridConfig?.selectionType == "checkbox") {
        const removeIds = curInstanceIds.filter(
          (id: any) => !selectItem.includes(id)
        );
        const newIds = selectedIds
          ? selectedIds.filter((id) => !removeIds.includes(id))
          : [];
        newSelectedIds = [...newIds, ...selectItem].filter(onlyUnique);
        const filteredSelectedItems = selectedData.filter(
          (item) => !curInstanceIds.includes(item.key)
        );
        const newSelectedItems = [...filteredSelectedItems, ...selectedRows];
        newSelectedData = newSelectedItems;
      } else {
        newSelectedIds = selectItem;
        newSelectedData = selectedRows;
      }
      setSelectedIds(newSelectedIds);
      setSelectedData(newSelectedData);
    },
  };

  const handleChange = (
    pagination: TablePaginationConfig,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filters: Record<string, FilterValue | null>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    setGridConfig((prevState) => ({
      ...prevState,
      page: pagination.current as number,
      perPage: pagination.pageSize as number,
    }));
  };

  return (
    <Spin spinning={loading}>
      <Table
        className={`mg-table ${gridConfig?.serial && "mg-serial"} ${
          !gridConfig?.selectable ? "mg-disable-select" : ""
        }`}
        rowSelection={
          gridConfig?.selectable && {
            type: gridConfig?.selectionType,
            selectedRowKeys: selectedIds,
            ...rowSelection,
          }
        }
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        showSorterTooltip={false}
        sticky={true}
        pagination={
          isRawTable == true
            ? false
            : {
                defaultPageSize: gridConfig?.perPage,
                showSizeChanger: true,
                pageSizeOptions: gridConfig?.pageCustomize || [10, 20, 50, 100],
                total: gridConfig?.totalRows,
              }
        }
        // {...rest}
        // footer={footer ? () => footer : null}
        scroll={{
          x: true,
        }}
      />
    </Spin>
  );
};

export default MastergridTable;
