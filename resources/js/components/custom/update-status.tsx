import { Switch } from "@headlessui/react"
import { useEffect, useState } from "react"
import { router, useForm } from "@inertiajs/react"
import todos from "@/routes/todos";
import { Todo } from "@/types/todos/columns";


// stateless method where we don't use useState
// that's currently working fine, and if we need to use useState, then uncomment line 9, 11 to 13, 19, and instead of todo.completed in Switch, use enabled
// types/todo.ts


export default function UpdateStatus({ todo }: { todo: Todo }) {
    // const [enabled, setEnabled] = useState(todo.completed);

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setEnabled(todo.completed)
    // },[todo.completed])

    // ----------------------------
    // ✅ Approach 1: using router directly
    // ----------------------------
    function handleToggleRouter(val: boolean) {
        // setEnabled(val);
        setLoading(true);
        router.put(todos.toggle(todo.id).url, { completed: val }, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setLoading(false)
        })
    }

    // ----------------------------
    // ✅ Approach 2: using useForm helper
    // ----------------------------

    // const { put } = useForm();
    // function handleToggleForm(val: boolean) {
    //     setEnabled(val);
    //     put(todos.toggle(todo.id).url, {
    //         data: { completed: val },
    //         preserveScroll: true,
    //         preserveState:true,
    //     })
    // }

    return (
        <Switch
            checked={todo.completed}
            onChange={handleToggleRouter}
            // onChange={handleToggleForm}
            disabled={loading}
            className={`${todo.completed ? "bg-green-500" : "bg-gray-400"}
            ${loading ? "opacity-50 cursor-wait" : ""}
        relative inline-flex h-4.5 w-9.5 items-center rounded-full hover:cursor-pointer`}
        >
            <span
                className={`${todo.completed ? "translate-x-6" : "translate-x-1"}
          inline-block h-2.5 w-2.5 transform rounded-full bg-white transition `}
            />
        </Switch>
    )
}
