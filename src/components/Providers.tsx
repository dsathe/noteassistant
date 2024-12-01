'use client'
import React, { Children } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
    children: React.ReactNode
}

const qClient = new QueryClient()

const Providers = ({ children }: Props) => {
    return (
        <QueryClientProvider client={qClient}>
            {children}
        </QueryClientProvider>
    )
}

export default Providers;