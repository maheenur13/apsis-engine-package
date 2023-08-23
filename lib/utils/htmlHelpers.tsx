import type { ReactNode } from "react";
import { DangerousHtml } from "./constants";
import { apsisDate, apsisDateTime } from "./helpers";

export const filterColumn = (
    column: string,
    value: any,
    type: string
): JSX.Element => {
    let data = value !== null && value.value ? value.value : value;
    if (type === "date") {
        data = apsisDate(data);
        return <td>{data}</td>;
    } else if (type === "datetime") {
        data = apsisDateTime(data);
        return <td> {data} </td>;
    } else {
        return <td> {data} </td>;
    }
};

export const apsisHtmlParse = (string: string) => {
    return (
        <DangerousHtml
            style={{ textAlign: "justify" }}
            dangerouslySetInnerHTML={{ __html: string }}
        ></DangerousHtml>
    );
};

// right align
export const rightAlign = (data: ReactNode) => {
    return <div className='text-right'>{data}</div>;
};

// center align
export function centerAlign(data: ReactNode) {
    return <div className='text-center'>{data}</div>;
}
