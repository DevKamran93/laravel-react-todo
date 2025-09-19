import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

interface FlashProps{
    flash: {
        success?: string;
        error?: string;
    }
}

export default function FlashToaster() {
    const { flash } = usePage().props as FlashProps;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, { className: 'text-lg font-medium' });
        }
        if (flash.error) {
            toast.error(flash.error, { className: 'text-lg font-medium' });
        }
    }, [flash]);

    return null;
}
