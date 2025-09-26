import { Column } from "@/types/table";
import React from "react";

type TableHeadProps<T> = {
    columns: Column<T>[];
};

export function TableHead<T>({ columns }: TableHeadProps<T>) {
    return (
        <thead>
            <tr>
                {columns.map((col) => (
                    <th
                        key={col.key as string}
                        scope="col"
                        className="px-4 py-2 text-left font-semibold"
                    >
                        {col.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
