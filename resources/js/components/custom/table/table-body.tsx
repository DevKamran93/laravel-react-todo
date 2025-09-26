import { Column } from "@/types/table";

type TableBodyProps<T> = {
    columns: Column<T>[];
    data: T[];
    getRowKey?: (row: T, index: number) => string | number;
};

export function TableBody<T>({ columns, data, getRowKey }: TableBodyProps<T>) {
    return (
        <tbody>
            {data.length ? (
                data.map((row, rowIndex) => (
                    <tr
                        key={getRowKey ? getRowKey(row, rowIndex) : rowIndex}
                        className="border-t"
                    >
                        {columns.map((col, colIndex) => (
                            <td key={String(col.key)} className="px-4 py-2">
                                {col.render
                                    ? col.render(row, rowIndex, colIndex)
                                    : (row[col.key as keyof T] as React.ReactNode) ?? null}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                    <tr>
                        <td
                            colSpan={columns.length}
                            className="px-4 py-4 text-center text-gray-500"
                        >
                            No data found.
                        </td>
                    </tr>
            )}
        </tbody>
    );
}
