import React from "react";

type TableFooterProps = {
    children: React.ReactNode;
    colSpan: number;
};

export function TableFooter({ children, colSpan }: TableFooterProps) {
    return (
        <tfoot className="bg-gray-100 text-gray-800">
            <tr>
                <td colSpan={colSpan} className="px-4 py-2 text-center">
                    {children}
                </td>
            </tr>
        </tfoot>
    );
}
