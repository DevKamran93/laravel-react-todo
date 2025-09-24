export default function TableFooter({ children }: { children: React.ReactNode }) {
    return (
        <tfoot className="bg-gray-800 text-white">
            <tr>
                <td colSpan={100} className="px-4 py-2">
                    {children}
                </td>
            </tr>
        </tfoot>
    )
}
