import React from "react";

type TableFooterProps = {
    colSpan: number;
    children: React.ReactNode;
};

export function TableFooter({ colSpan, children }: TableFooterProps) {
    return (
        <tfoot>
            <tr>
                <td
                    colSpan={colSpan}
                    className="px-4 py-2 text-center font-medium"
                >
                    {children}
                </td>
            </tr>
        </tfoot>
    );
}
