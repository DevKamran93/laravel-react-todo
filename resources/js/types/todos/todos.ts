/**
 * Todo model shape used by the UI (adapt if your backend fields differ).
 */
export interface Todo {
    id: number;
    title: string;
    description?: string | null;
    alert: boolean;
    alert_at?: string | null;
    alert_at_form?: string | null
    completed: boolean;
    created_at: string;
    user_id?: number;
}

export type TodoFormData = Omit<Todo, "id" | "created_at" | "updated_at"> & {
    alert_at: string;
    description: string
}
