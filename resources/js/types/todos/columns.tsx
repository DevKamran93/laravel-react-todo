import UpdateStatus from "@/components/custom/update-status";
import { Column } from "../table";
import ActionDropDown from "@/components/custom/action-button";
import AddEditTodoDialog from "@/components/custom/dialogbox";
import DeleteDialog from "@/components/custom/delete-dialog";
import type { Todo } from "./todos";

export const todoColumn: Column<Todo>[] = [
    // Virtual column "sr" → not actually in DB, so use render
    { key: "sr", label: "Sr.", render: (_row, rowIndex) => (rowIndex ?? 0) + 1 },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    {
        key: "alert_at",
        label: "Alert Date & Time",
        render: (todo) => todo.alert_at_formatted ?? "No",
    },
    {
        key: "completed",
        label: "Completed",
        render: (todo) => (
            <div className="flex gap-1.5 mt-2">
                <span className="pl-2">
                    {todo.completed ? "Yes" : "No"}
                </span>
                <UpdateStatus todo={todo} />
            </div>
        ),
    },
    { key: "created_at", label: "Created" },
    {
        key: "action",
        label: "Action",
        render: (todo) => (
            <ActionDropDown
                items={[
                    {
                        label: "Edit",
                        render: () => (
                            <AddEditTodoDialog
                                buttonItem={{ label: "Edit" }}
                                contentItem={{ title: "Edit Todo" }}
                                todo={todo}
                                triggerType="text"
                                buttonClass="py-1 mb-1 w-full text-left pl-1 rounded hover:bg-gray-700 hover:cursor-pointer"
                            />
                        ),
                    },
                    {
                        label: "Delete",
                        render: () => (
                            <DeleteDialog
                                todo={todo}
                                customClass="py-1 mb-1 w-full text-left pl-1 rounded hover:bg-gray-700 hover:cursor-pointer"
                            />
                        ),
                    },
                ]}
            />
        ),
    },
];
