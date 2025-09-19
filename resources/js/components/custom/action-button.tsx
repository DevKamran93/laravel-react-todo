import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";

interface ActionDropDownItems {
    label?: string;
    href?: string;
    onClick?: () => void;
    render?: () => React.ReactNode; // 🔥 new prop for custom rendering
    customClass?: string
}

interface ActionDropDownProps {
    items: ActionDropDownItems[];
}
export default function ActionDropDown({ items }: ActionDropDownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 m-0 rounded-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent"
                >
                    <EllipsisVertical className="h-6 w-6" />
                </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {items.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                        {item.render ? (
                            item.render()
                        ) : item.href ? (
                                <Link href={item.href} className={item.customClass}>{item.label}</Link>
                        ) : (
                            <span className={item.customClass} onClick={item.onClick}>{item.label}</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
