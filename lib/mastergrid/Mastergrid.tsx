/* eslint-disable @typescript-eslint/no-unused-vars */
import { Row } from "antd";
import { useFetchMasterGridData } from "../hooks";

import { useEffect, useState } from "react";
import type { FC } from "react";
import { gridConfigs } from "./masterGrid.contatnts";
// import { generateTitleData, gridDatGeneration } from "../utils/mastergrid";
import { MastergridStyle } from "./Mastergrid.styled";
import MastergridActionButtons from "./MastergridActionButtons";
import MastergridCommonSearch from "./MastergridCommonSearch";
import MastergridFilter from "./MastergridFilter";
import MastergridSearchPanel from "./MastergridSearchPanel";
import MastergridTable from "./MastergridTable";
import MastergridTitle from "./MastergridTitle";

import { generateTitleData, gridDatGeneration } from "../utils";
import { MastergridColumnRender } from "./MastergridColumnRender";
import type { IGridConfigOptions, ISearchData } from "../interfaces/mastergrid";

interface GridProps extends Partial<IGridConfigOptions> {
  slug: string;
  getAllValue?: any;
  is_selectable?: boolean;
  is_serial?: boolean;
}

export const Mastergrid: FC<GridProps> = ({
  slug,
  title,
  is_selectable = false,
  getAllValue,
}) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [isRawTable, setIsRawTable] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [disabledIds, setDisabledIds] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>();
  const [gridConfig, setGridConfig] = useState<IGridConfigOptions>(gridConfigs);
  const [curInstanceIds, setCurInstanceIds] = useState<any[]>([]);
  const [gridDatas, setGridDatas] = useState<any[]>([]);

  const {
    fetchGridData,
    fetchTitleData,
    masterGridData: gridData,
    isLoading: dataLoading,
    titleData,
  } = useFetchMasterGridData();

  const [searchText, setSearchText] = useState<string>("");
  const [searchData, setSearchData] = useState<Array<ISearchData>>([]);
  const [extraCondition, setExtraCondition] = useState<string>("");

  useEffect(() => {
    if (
      gridConfig.primaryKeyField &&
      !gridConfig.clientSide &&
      gridData?.items
    ) {
      const { data, curInstanceIds } = gridDatGeneration(gridData, gridConfig);
      setGridDatas(data);
      setCurInstanceIds(curInstanceIds);
      if (getAllValue) {
        getAllValue(data);
      }
    }
  }, [gridConfig, gridData]);
  useEffect(() => {
    if (titleData && titleData?.columns.length > 0) {
      const {
        gridConfig: getGridConfig,
        generatedColumns,
        clientSideGridData,
        selectedIds: getSelectedIds,
      } = generateTitleData(titleData, title, is_selectable);
      const filteredColumn = generatedColumns.map((column: any) => {
        const render = (value: any, row: any) => {
          return (
            <MastergridColumnRender column={column} value={value} row={row} />
          );
        };
        return { ...column, render };
      });
      setColumns(filteredColumn);
      setGridConfig(getGridConfig);
      setSelectedIds(getSelectedIds);

      if (getGridConfig?.clientSide) {
        const { data, curInstanceIds } = clientSideGridData;
        setGridDatas(data);
        setCurInstanceIds(curInstanceIds);
      }
    }
  }, [is_selectable, title, titleData]);

  const getMasterGridData = async () => {
    await fetchGridData(
      {
        slug: slug,
        extra: {
          extra_condition: extraCondition,
        },
        search_key: { search_text: searchText },
        page: gridConfig.page,
        per_page: gridConfig.perPage,
        search_data: searchData,
      },
      "master-grid/grid-data"
    );
  };

  useEffect(() => {
    if (slug) {
      getMasterGridData();
    }
  }, [extraCondition, gridConfig, searchData, searchText, slug]);

  useEffect(() => {
    if (slug) {
      fetchTitleData(
        {
          slug,
          extra: {
            extra_condition: extraCondition,
          },
          search_key: { search_text: searchText },
          search_data: searchData,
        },
        "master-grid/grid-title"
      );
    }
  }, [extraCondition, searchData, searchText, slug]);

  return (
    <MastergridStyle className="mg">
      <MastergridTitle title={gridConfig?.title} />
      <MastergridSearchPanel />
      <Row className="mg-action-rows">
        <MastergridFilter gridConfig={gridConfig} />
        <MastergridCommonSearch
          gridConfig={gridConfig}
          isRawTable={isRawTable}
          setSearchText={setSearchText}
        />
        <MastergridActionButtons />
      </Row>
      <MastergridTable
        loading={dataLoading || dataLoading}
        columns={columns}
        curInstanceIds={curInstanceIds}
        data={gridDatas}
        disableIds={disabledIds}
        gridConfig={gridConfig}
        isRawTable={isRawTable}
        selectedData={selectedData}
        selectedIds={selectedIds}
        setSelectedData={setSelectedData}
        setSelectedIds={setSelectedIds}
        setGridConfig={setGridConfig}
      />
    </MastergridStyle>
  );
};
