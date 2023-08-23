import { apsisDate, apsisDateTime, apsisMoney, apsisMonth, apsisQuantity, envProducer } from "../utils";


export const MastergridColumnRender = ({ column, value, row, linkView }: any) => {
    const baseURL = envProducer("public");

    if (column.link) {
        return (
            <>
                {value.link === "view/" ? (
                    <span
                        style={{
                            display: "block",
                            color: "blue",
                            textDecoration: "underline",
                            textAlign: column.text_align ?? "left",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            linkView && linkView(column, row);
                        }}
                    >
                        {value.value}
                    </span>
                ) : (
                    <a
                        style={{
                            display: "block",
                            color: "blue",
                            textDecoration: "underline",
                            textAlign: column.text_align ?? "left",
                        }}
                        href={
                            value.link
                                ? value.link.includes(`public/files`)
                                    ? `${baseURL}${value.link}`
                                    : value.link
                                : "#"
                        }
                        target='_blank'
                        rel='noreferrer'
                    >
                        {value.value}
                    </a>
                )}
            </>
        );
    }
    if (column.field_type == "date") {
        return (
            <span
                style={{
                    display: "block",
                    textAlign: column.text_align ?? "left",
                }}
            >
                {apsisDate(value)}
            </span>
        );
    }
    if (column.field_type == "month") {
        return (
            <span
                style={{
                    display: "block",
                    textAlign: column.text_align ?? "left",
                }}
            >
                {apsisMonth(value)}
            </span>
        );
    }
    if (column.field_type == "datetime") {
        return (
            <span
                style={{
                    display: "block",
                    textAlign: column.text_align ?? "left",
                }}
            >
                {apsisDateTime(value)}
            </span>
        );
    }
    if (column.field_type == "number") {
        return (
            <span
                style={{
                    display: "block",
                    textAlign: column.text_align ?? "right",
                }}
            >
                {apsisQuantity(value, row.hidden_uom)}
            </span>
        );
    }
    if (column.field_type == "money") {
        return (
            <span
                style={{
                    display: "block",
                    textAlign: column.text_align ?? "right",
                }}
            >
                {apsisMoney(value, row.hidden_currency)}
            </span>
        );
    }
    return (
        <span
            style={{
                display: "block",
                textAlign: column.text_align ?? "left",
            }}
        >
            {value}
        </span>
    );
};

