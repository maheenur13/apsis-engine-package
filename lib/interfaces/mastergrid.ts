export type GridConfig = {
    is_selectable: boolean;
    is_serial: boolean;
    filter_column: boolean;
    title: string;
};

export interface GridProps extends Partial<GridConfig> {
    slug: string;
}
export interface IGridConfigOptions {
    title: string;
    serial: boolean;
    selectable: boolean;
    totalRows: number;
    filterColumn: boolean;
    selectionType: "checkbox" | "radio" | "none"; // Adjust this if there are other possible values
    primaryKeyField: string;
    clientSide: boolean;
    searchPanel: Record<string, any>; // You can specify a more specific type if needed
    exportExcel: boolean;
    exportPdf: boolean;
    exportCsv: boolean;
    exportPrinting: boolean;
    pageCustomize: number[] | string[];
    perPage: number;
    page: number;
    initialButtons: any[]; // You can specify a more specific type if needed
    buttonData: any[]; // You can specify a more specific type if needed
    client_side?:boolean;
}
type ISearchType = {
    search_text: string;
};
export type ISearchData = {
    name: string;
    value: string;
};
type ISearchOptions = {
    id: number;
    value: string;
};

export interface IGridDataPayloadType {
    extra: object;
    page: number;
    per_page: number;
    search_data: Array<ISearchData>;
    search_key: ISearchType;
    slug?: string;
}
export interface IGridResponseType {
    items: [];
    page: number;
    per_page: number;
}

export type IGridTitlePayloadType = Omit<IGridDataPayloadType, "page" | "per_page">

type ISearchFieldsType = {
    column_space: number;
    company_id: number;
    created_at: Date;
    created_by: number;
    deleted_at: Date;
    deleted_by: number;
    dropdown_options: string;
    dropdown_slug: string;
    input_class: string;
    input_default_val: string;
    input_id: string;
    input_name: string;
    input_operation_type: string;
    input_placeholder: string;
    input_type: string;
    label_class: string;
    label_name: string;
    module_id: number;
    multiple: number;
    required: number;
    search_panel_detail_id: number;
    search_panel_slug: string;
    single_compare: number;
    sorting: number;
    status: number;
    updated_at: Date;
    updated_by: number;
};

type IButtonsType = {
    always_show: number;
    btn_class: string;
    btn_data_attr: string | null;
    btn_icon: string;
    btn_id: string;
    btn_name: string;
    btn_order: string;
    btn_slug: string;
    btn_type: string;
    disable_status: string | boolean | null;
    enable_multiple: number | boolean | null;
    enable_status: string | boolean | null;
    in_dropdown: number;
    route_link: string | null;
};

export type ISearchPanel = {
    prefix: boolean;
    search_fields: Array<ISearchFieldsType>;
    search_option: Array<ISearchOptions>;
    search_slug: string;
    searched_value: string;
    session_filter: string;
};

type IColumnType = {
    dataIndex: string;
    field_type: string;
    key: string;
    link: boolean;
    sortable: boolean;
    text_align: string;
    title: string;
};

export interface IGridTitleResponseType {
    action_table: string;
    attributes: Array<string>;
    buttons: Array<IButtonsType>;
    checkbox: number;
    client_side: number;
    columns: Array<IColumnType>;
    export_csv: number;
    export_excel: number;
    export_pdf: number;
    export_printing: number;
    is_column_customizable: boolean | number | null;
    items: Array<any>;
    master_grid_title: string;
    primary_key_field: string;
    page_customize: string;
    search_panel: any;
    selectable: number;
    serial: number;
    total_item: number;
    master_column_title_for_app:any;
}



export interface IGridDataPayload {
    extra?: object;
    page: number;
    per_page: number;
    search_data?: Array<ISearchData>;
    search_key?: ISearchType;
    slug?: string;
}
export interface IGridResponse {
    items: any[];
    page: number;
    per_page: number;
}

export type IGridTitlePayload = Omit<IGridDataPayload, "page" | "per_page">





export interface IGridTitleResponse {
    action_table: string;
    attributes: Array<string>;
    buttons: Array<IButtonsType>;
    checkbox: number;
    client_side: number;
    columns: Array<IColumnType>;
    export_csv: number;
    export_excel: number;
    export_pdf: number;
    export_printing: number;
    is_column_customizable: boolean | number | null;
    items: Array<any>;
    master_grid_title: string;
    primary_key_field: string;
    page_customize: string;
    search_panel: any;
    selectable: number;
    serial: number;
    total_item: number;
    master_column_title_for_app:any;
}
