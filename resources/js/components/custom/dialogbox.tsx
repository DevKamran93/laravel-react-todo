import { useForm } from "@inertiajs/react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"

import todos from "@/routes/todos"
import type { Todo } from "@/types/todos/todos"

interface DialogBoxItem {
    label: string
}

interface DialogBoxContent {
    title: string
}

interface DialogBoxTriggerProps {
    buttonItem: DialogBoxItem
    contentItem: DialogBoxContent
    triggerType?: "button" | "text"
    buttonClass?: string
    headerClass?: string
    // todo?: {
    //     id: number
    //     title: string
    //     description: string
    //     alert: boolean
    //     alert_at: string
    //     alert_at_form: string
    //     completed: boolean
    // }
    todo?: Todo
}

export default function AddEditTodoDialog({
    buttonItem,
    contentItem,
    triggerType,
    buttonClass,
    headerClass,
    todo,
}: DialogBoxTriggerProps) {
    const [open, setOpen] = useState(false);

    // function formattedDate(value) {
    //     return new Date(value).toISOString().slice(0, 16);
    // }

    // Prefill if editing
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: todo?.title ?? "",
        description: todo?.description ?? "",
        alert: todo?.alert ?? false,
        alert_at: todo?.alert_at
            ? (todo.alert_at_form ? todo.alert_at_form : alert_at_formatted)
            : "",

        completed: todo?.completed ?? false,
    })

    function submit(e: React.FormEvent) {
        e.preventDefault();

        const isUpdate = !!todo?.id;
        const url = isUpdate ? todos.update(todo.id).url : todos.store().url;
        const method = isUpdate ? put : post;

        // First way
        method(url, {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
            onError: (err) => handleErrorFocus(err)
        });

        // second way
        // const options = {
        //     onSuccess: () => {
        //         reset();
        //         setOpen(false);
        //     },
        //     onError: (err: any) => handleErrorFocus(err),
        // },

        // if (todo?.id) {
        //     put(todos.update(todo.id).url, options)
        // } else {
        //     post(todos.store().url, options)
        // }

        // if (todo?.id) {
        //     // ✅ Update existing
        //     put(todos.update(todo.id).url, {
        //         onSuccess: () => {
        //             reset()
        //             setOpen(false)
        //         },
        //         onError: (err) => handleErrorFocus(err),
        //     })
        // } else {
        //     // ✅ Create new
        //     post(todos.store().url, {
        //         onSuccess: () => {
        //             reset()
        //             setOpen(false)
        //         },
        //         onError: (err) => handleErrorFocus(err),
        //     })
        // }
    }

    function handleErrorFocus(err: Record<string, string>) {
        let field = ""
        if (err.title) field = "title"
        else if (err.description) field = "description"
        else if (err.alert_at) field = "alert_at"

        if (field) document.getElementById(field)?.focus()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerType === "button" ? (
                    <Button type="button" className={buttonClass} onClick={() => setOpen(true)}>
                        {buttonItem.label}
                    </Button>
                ) : (
                    <button className={buttonClass}>{buttonItem.label}</button>
                )}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className={headerClass}>
                    <DialogTitle>{contentItem.title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
                    </div>

                    {/* Alert */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="alert"
                            checked={data.alert}
                            onCheckedChange={(checked) => setData("alert", !!checked)}
                        />
                        <Label htmlFor="alert">Enable Alert</Label>
                    </div>

                    {/* Alert Date/Time */}
                    {data.alert && (
                        <div>
                            <Label htmlFor="alert_at">Alert Date & Time</Label>
                            <Input
                                id="alert_at"
                                type="datetime-local"
                                value={data.alert_at}
                                onChange={(e) => setData("alert_at", e.target.value)}
                            />
                            {errors.alert_at && (
                                <p className="text-red-500 text-sm">{errors.alert_at}</p>
                            )}
                        </div>
                    )}

                    {/* Completed */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="completed"
                            checked={data.completed}
                            onCheckedChange={(checked) => setData("completed", !!checked)}
                        />
                        <Label htmlFor="completed">Mark as completed</Label>
                    </div>

                    {/* Submit */}
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            {todo?.id
                                ? processing
                                    ? "Updating..."
                                    : "Update Todo"
                                : processing
                                    ? "Saving..."
                                    : "Save Todo"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
