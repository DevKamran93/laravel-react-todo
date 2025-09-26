import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
// import { index } from '@/routes/dashboard';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
interface DashboardStats {
    users: number
    totalTodos: number
    completedTodos: number
    pendingTodos: number
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        // href: index().url
    },
];

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"> */}
                    <Card className='shadow-sm relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-tl from-red-500 via-red-700 to-black-500 transition-all duration-400 ease-in-out hover:scale-105'>
                        <CardHeader>
                            <CardTitle>Total Users</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">
                            {stats.users}
                        </CardContent>
                    </Card>
                    {/* </div> */}
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"> */}
                    <Card className='shadow-sm relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-tl from-blue-500 via-blue-700 to-black-500 transition-all duration-400 ease-in-out hover:scale-105'>
                        <CardHeader>
                            <CardTitle>Total Todos</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">
                            {stats.totalTodos}
                        </CardContent>
                    </Card>
                    {/* </div> */}
                    {/* <div className=""> */}
                    <Card className='shadow-sm relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-tl from-green-500 via-green-700 to-black-500 transition-all duration-400 ease-in-out hover:scale-105'>
                        <CardHeader>
                            <CardTitle>Completed Todos</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">
                            {stats.completedTodos}
                        </CardContent>
                    </Card>
                    {/* </div> */}
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"> */}
                    <Card className='shadow-sm relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-tl from-purple-500 via-purple-700 to-black-500 transition-all duration-400 ease-in-out hover:scale-105'>
                        <CardHeader>
                            <CardTitle>Pending Todos</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl font-bold">
                            {stats.pendingTodos}
                        </CardContent>
                    </Card>
                    {/* </div> */}
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
