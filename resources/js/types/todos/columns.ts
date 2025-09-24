export type Column<T> = {
    key: keyof T
    // key: keyof T | "action" // must match keys in your data type
    label: string
    render?: (row: T, rowIndex?: number, colIndex?: number) => React.ReactNode
}
