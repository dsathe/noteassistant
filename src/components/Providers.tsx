'use client'
import React, { Children } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/*
    Description ->  QueryClient is the central client that stores cache and configuration for React Query. 
                    QueryClientProvider is a React context provider that makes your QueryClient instance available to the rest of your application. 
*/

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