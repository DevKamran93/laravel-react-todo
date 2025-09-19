import ActionDropDown from '@/components/custom/action-button';
import DeleteDialog from '@/components/custom/delete-dialog';
import AddEditDialog from '@/components/custom/dialogbox';
import UpdateStatus from '@/components/custom/update-status';
import FlashToaster from '@/components/flash-toastr';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/todos';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Todos',
        href: index.url(),
    },
];

export default function Index({ todos }: { todos: Todo[] }) {

    const { quote } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Todos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h3 className='animate-pulse text-[red,blue]'>
                    <span className='text-lg font-bold'>Today's Quote: </span>
                    <span className='italic mx-3'>{quote.message}</span>
                    ---
                    <span className='font-mono font-bold underline ml-3'>{quote.author}</span>
                </h3>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold'>Todos</h1>
                    {/* <Button className='bg-blue-400 hover:bg-blue-600 text-white hover:cursor-pointer'>Add New Todo</Button> */}
                    <AddEditDialog buttonItem={{ label: "Add New Todo" }} contentItem={{ title: "Add New Todo" }} triggerType='button' buttonClass="bg-blue-400 hover:bg-blue-600 text-white hover:cursor-pointer" headerClass='mb-5' />
                </div>
                <div className="shadow rounded overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#171717] text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">Sr.</th>
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">Alert Date & Time</th>
                                <th className="px-4 py-2 text-left">Completed</th>
                                <th className="px-4 py-2 text-left">Created</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-950 text-white">
                            {todos.length ? (
                                todos.map((todo, index) => (
                                    <tr key={todo.id} className="border-t">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{todo.title}</td>
                                        <td className="px-4 py-2">{todo.description}</td>
                                        <td className="px-4 py-2">{todo.alert_at == null ? 'No' : todo.alert_at}</td>
                                        <td className="px-4 py-2 flex gap-1.5 mt-2"><span className='pl-2'>{todo.completed == true ? 'Yes' : 'No'}</span> <span><UpdateStatus todo={todo} /></span></td>
                                        <td className="px-4 py-2">{todo.created_at}</td>
                                        <td className="px-4 py-2">
                                            <ActionDropDown items={[
                                                {
                                                    label: "Edit",
                                                    render: () => (
                                                        <AddEditDialog buttonItem={{ label: "Edit" }} contentItem={{ title: "Edit Todo" }} todo={todo} triggerType='text' buttonClass='py-1 mb-1 w-full text-left pl-1 rounded hover:bg-gray-700 hover:cursor-pointer' />
                                                    ),
                                                    customClass: "bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer",
                                                },
                                                {
                                                    label: "Delete",
                                                    render: () => (
                                                        <DeleteDialog
                                                            // trigger="text"
                                                            todo={todo}
                                                            customClass="py-1 w-full text-left pl-1 rounded text-red-500 hover:bg-red-600 hover:text-white hover:cursor-pointer" />
                                                    ),
                                                },
                                            ]} />
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                                        No roles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Toaster
                    position="top-center"
                    richColors
                    toastOptions={{
                        className: "text-sm font-medium",
                    }}
                />
                <FlashToaster />
            </div>
        </AppLayout>
    );
}
