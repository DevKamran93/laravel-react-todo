import { PageProps as InertiaPageProps } from '@inertiajs/core';

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps{
        quote: {
            message?: string;
            author?: string;
        };
        auth: {
            id: number;
            name: string;
            email: string;
        }
    }
}
