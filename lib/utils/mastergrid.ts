import type { IGridConfigOptions, IGridResponse, IGridTitleResponse } from "../interfaces/mastergrid";

import { columnShorter } from "./sorter";

export const onlyUnique = (value: any, index: any, self: string | any[]) => {
  return self.indexOf(value) === index;
};

export const gridDataWithKey = (
  gridData: any[],
  gridConfig: { primaryKeyField: any; page: any; perPage: any }
) => {
  const { primaryKeyField, page, perPage } = gridConfig;
  const incPage: any = Number((page - 1) * perPage) + 1;
  const data = gridData?.map((item: { [x: string]: any }, index: any) => {
    return {
      key: String(item[primaryKeyField]),
      serial: index + incPage,
      ...item,
    };
  });
  const curInstanceIds = data.map((item: { key: any }) => item.key);
  return { data, curInstanceIds };
};

export const gridDatGeneration = (
  gridData: IGridResponse,
  gridConfig: any
) => {
  const { data, curInstanceIds } = gridDataWithKey(gridData.items, gridConfig);
  return { data, curInstanceIds };
};

export const generateTitleData = (
  titleData: IGridTitleResponse,
  title: any,
  is_selectable: any
) => {
  const {
    master_grid_title,
    buttons,
    page_customize,
    export_excel,
    export_pdf,
    export_csv,
    export_printing,
    client_side,
    serial,
    checkbox,
    primary_key_field,
    search_panel,
    total_item,
    columns,
    items,
    selectable,
    is_column_customizable,
  } = titleData;

  const gridConfig: IGridConfigOptions = {
    selectable: is_selectable ? !!is_selectable : !!selectable,
    title: title || master_grid_title,
    filterColumn: !!is_column_customizable,
    totalRows: total_item,
    selectionType: checkbox ? "checkbox" : "radio",
    primaryKeyField: String(primary_key_field),
    serial: !!serial,
    clientSide: client_side ? true : false,
    searchPanel: search_panel,
    initialButtons: buttons,
    buttonData: buttons,
    exportExcel: !!export_excel,
    exportPdf: !!export_pdf,
    exportCsv: !!export_csv,
    exportPrinting: !!export_printing,
    page: 1,
    pageCustomize: [],
    perPage: 10,
  };
  if (
    page_customize &&
    page_customize.split(",") &&
    page_customize.split(",").length > 1
  ) {
    gridConfig.pageCustomize = page_customize.split(",");
    gridConfig.perPage = Number(page_customize.split(",")[0]);
  }

  if (columns?.length > 10) {
    columns.map((column: any, index: number) => {
      if (index === 0 || index === 1) {
        return { ...column, width: 120, fixed: "left" };
      }
      return column;
    });
  }

  const serialColumn = [
    {
      title: "SL",
      dataIndex: "serial",
      key: "serial",
      link: false,
      text_align: "center",
      field_type: "text",
      fixed: columns.length > 10 ? "left" : "",
    },
  ];

  const updatedColumns =
    Number(serial) == 1 ? [...serialColumn, ...columns] : columns;

  const generatedColumns = updatedColumns.map((column: any) => {
    if (column?.sortable) {
      return {
        ...column,
        sorter: (a: any, b: any) => columnShorter(a, b, column),
      };
    }
    return column;
  });

  const clientSideGridData = client_side
    ? gridDataWithKey(items, gridConfig)
    : { data: [], curInstanceIds: [] };

  const selectedIds: any = [];

  return { gridConfig, generatedColumns, clientSideGridData, selectedIds };
};
