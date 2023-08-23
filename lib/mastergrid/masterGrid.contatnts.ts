import type { IGridConfigOptions } from "../interfaces/mastergrid";

export const gridConfigs:IGridConfigOptions ={
    title: "Mastergrid",
    serial: false,
    selectable: true,
    totalRows: 10,
    filterColumn: false,
    selectionType: "checkbox",
    primaryKeyField: "",
    clientSide: false,
    searchPanel: {},
    exportExcel: false,
    exportPdf: false,
    exportCsv: false,
    exportPrinting: false,
    pageCustomize: [10, 20, 50, 100],
    perPage: 10,
    page: 1,
    initialButtons: [],
    buttonData: [],
    
}