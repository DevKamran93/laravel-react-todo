import { Column } from "@/types/todos/columns"
import TableBody from "./table-body"
import TableFooter from "./table-footer"
import TableHead from "./table-head"

interface TableProps<T> {
    columns: Column<T>[]
    data: T[]
    footer?: React.ReactNode
}


export default function CustomTable<T>({ columns, data, footer }: TableProps<T>) {
    return (
        <table className="w-full border-collapse">
            <TableHead columns={columns} />
            <TableBody columns={columns} data={data} />
            {footer && <TableFooter>{footer}</TableFooter>}
        </table>
    )
}
