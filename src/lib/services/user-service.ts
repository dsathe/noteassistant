import { clerkClient } from '@/lib/clerk-server';

/*
    Description -> Get user details
    Input -> userId
    Output -> user
*/
export async function getUser(userId: string) {
    return await clerkClient.users.getUser(userId);
}
