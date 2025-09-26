import React from "react";

/**
 * Generic Column type used by the table components.
 * - key: ideally `keyof T` (a real field on the row). We still allow `string`
 *   so you can define virtual columns like "sr" or "action" that don't exist on T.
 * - label: header text.
 * - render: optional custom renderer (receives typed row + indexes).
 */

export type Column<T = any> = {
    key: keyof T | string;
    label: string;
    render?: (row: T, rowIndex?: number, colIndex?: number) => React.ReactNode;
}
