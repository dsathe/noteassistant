import { createClerkClient } from '@clerk/backend';

/*
    Description -> Creating a client for Clerk backend. 
*/

export const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })