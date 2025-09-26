import { Column } from "@/types/table"
import React from "react";
import { TableHead } from "./table-head";
import { TableBody } from "./table-body";
import { TableFooter } from "./table-footer";

type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    footer?: React.ReactNode;
};

export function CustomTable<T>({ columns, data, footer }: TableProps<T>) {
    return (
        <table className="w-full">
            <TableHead columns={columns} />
            <TableBody columns={columns} data={data} />
            {footer && <TableFooter colSpan={columns.length}>{footer}</TableFooter>}
            {/* We'll plug in <TableHead /> */}
            {/* We'll plug in <TableBody /> */}
            {/* We'll plug in <TableFooter /> */}
        </table>
    );
}
