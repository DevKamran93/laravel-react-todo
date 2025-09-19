import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useForm } from "@inertiajs/react";
import todos from "@/routes/todos";


interface ConfirmDeleteProps{
    todo: {
        id: number;
        title?: string;
    }
    customClass: string;
}
export default function DeleteDialog({ todo, customClass }: ConfirmDeleteProps) {
    const [open, setOpen] = useState(false);
    const { delete: destroy, processing } = useForm();

    function handleDelete() {
        destroy(todos.destroy(todo.id).url, {
            onSuccess: () => {
                setOpen(false)
            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div onClick={() => setOpen(true)} className={customClass}>Delete</div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete Todo?
                    </DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete <strong>{todo.title}</strong>? This action cannot be undone.</p>
                <DialogFooter>
                    <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                        {processing ? "Deleting...":"Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
