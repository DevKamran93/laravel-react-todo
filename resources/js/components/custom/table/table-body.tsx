import { Column } from "@/types/table"

type TableBodyProps<T> = {
    columns: Column<T>[];
    data: T[];
};

export function TableBody<T>({ columns, data }: TableBodyProps<T>) {
    return (
        <tbody>
            {data.length ? (
                data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t">
                        {columns.map((col, colIndex) => (
                            <td key={`${rowIndex}-${colIndex}`} className="px-4 py-2">
                                {col.render ? col.render(row, rowIndex) : (row as any)[col.key]}
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
