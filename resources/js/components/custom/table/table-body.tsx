import { Column } from "@/types/todos/columns";

export default function TableBody<T>({ columns, data }: { columns: Column<T>[], data: T[] }) {

    return (
        <tbody className="bg-gray-950 text-white">
            {data?.length ? (
                data.map((row: T, rowIndex: number) => (
                    <tr key={(row as any )?.id ?? rowIndex} className="border-t">
                        {columns.map((col, colIndex) => (
                            <td key={`${rowIndex}-${colIndex}`} className="px-4 py-2">
                                {/* {col.render ? col.render(row) : (row as any)[[col.key]]} */}
                                {col.render ? col.render(row, rowIndex,colIndex) : (row as any)[col.key as string]}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                    <tr>
                        <td colSpan={columns.length} className="px-4 py-4 text-center text-gray-500">
                            No data found.
                        </td>
                    </tr>
            )}
        </tbody>
    )
}
