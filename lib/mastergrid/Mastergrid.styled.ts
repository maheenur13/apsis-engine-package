import { styled } from "styled-components";

export const MastergridStyle = styled.div`
    position: relative;
    border: 1px solid #e0dee0;
    margin: 0;
    padding: 0;

    .mg-title-area {
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
        align-items: center;
        border-bottom: 1px solid #e0dee0;
        background: #fff;
        .mg-title {
            padding-top: 5px;
            h6 {
                margin: 0 0 3px 0;
            }
        }
    }

    .mg-search-area {
        padding: 0 15px;
    }

    .mg-search-filter {
        display: inline-block;
        text-align: right;
        max-width: 300px;
        position: relative;
        margin: 10px;
        .mg-search-icon {
            position: absolute;
            right: 10px;
            top: 5px;
        }
    }

    .mg-action-rows {
        background: #fff;
    }

    .mg-table {
        .ant-table {
            border-radius: 0;
            .ant-table-header {
                border: 1px solid #1e1e2d;
                border-bottom: none;
                border-top: none;
            }
            .ant-table-body {
                border: 1px solid #d3d3d3;
                border-top: none;
                border-bottom: none;
                max-height: calc(100vh - 200px);
                overflow: auto !important;
            }
            .ant-table-thead .ant-table-cell-fix-left {
                outline: 2px solid #444;
                &:hover {
                    background-color: #1e1e2d !important;
                    background: #1e1e2d !important;
                    border: 1px solid #1e1e2d;
                }
            }
            .ant-table-sticky-scroll {
                display: none !important;
            }
            .ant-table-container {
                padding: 10px;
                table {
                    border-collapse: collapse;
                    min-width: 100%;
                    thead {
                        tr {
                            th {
                                background-color: #1e1e2d;
                                border: 1px solid #444;
                                color: #fff;
                                padding: 2px 6px;
                                font-size: 10px;
                                line-height: 1;
                                text-transform: uppercase;
                                word-break: break-word;
                                .ant-table-filter-trigger {
                                    margin: 2px;
                                    padding: 0px;
                                }
                            }
                            &:first-child {
                                th {
                                    border-radius: 0;
                                    &:first-child {
                                        border-radius: 0;
                                    }
                                    &:last-child {
                                        border-radius: 0;
                                    }
                                }
                            }
                        }
                    }
                    tbody,
                    .ant-table-tbody {
                        tr {
                            &:nth-child(odd) {
                                background: #f1f1f1;
                                .ant-table-cell-fix-left {
                                    background: #f1f1f1;
                                }
                                &.ant-table-row-selected {
                                    .ant-table-cell-fix-left {
                                        background: #c1f7d7;
                                    }
                                }
                            }
                            td {
                                padding: 2px 6px;
                                font-size: 10px;
                                line-height: 1;
                                border: 1px solid #d3d3d3;
                            }
                            td.ant-table-cell.ant-table-selection-column {
                                min-width: auto;
                            }
                            td.ant-table-cell {
                                min-width: 120px;
                            }
                            &.ant-table-row-selected {
                                td {
                                    background: #c1f7d7;
                                    color: #000;
                                }
                            }
                            &:hover {
                                background: #c1f7d7;
                                color: #000;
                                .ant-table-cell-fix-left {
                                    background: #c1f7d7 !important;
                                }
                            }
                        }
                        .ant-table-cell-fix-left {
                            outline: 1px solid #d3d3d3;
                        }
                    }
                }
            }
        }
        .ant-pagination-item-active {
            color: white;
            background-color: #1e1e2d;
            border: 1px solid #1e1e2d;
        }
    }

    .mg-serial {
        .ant-table-cell:first-child {
            min-width: 40px !important;
            .ant-dropdown-trigger.ant-table-filter-trigger {
                display: none;
            }
        }
    }

    .mg-disable-select .ant-table-selection-col,
    .mg-disable-select .ant-table-selection-column {
        display: none;
    }
    .mg-disable-select .ant-table-row td {
        padding-top: 6px !important;
        padding-bottom: 6px !important;
    }

    .mg-blank {
        .ant-table-expanded-row-fixed {
            width: 100% !important;
        }
        table {
            width: max-content !important;
        }
        .ant-table-thead .ant-table-cell-fix-left {
            outline: 0 !important;
        }
    }
`;


