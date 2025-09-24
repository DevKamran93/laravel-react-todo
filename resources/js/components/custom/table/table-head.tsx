import { Column } from "@/types/todos/columns";

export default function TableHead<T>({ columns }: { columns: Column<T>[] }) {
    return (
        <thead className="bg-[#171717] text-white">
            <tr>
                {columns.map((col) => (
                    <th key={col.key.toString()} className="px-4 py-2 text-left">
                        {col.label}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
