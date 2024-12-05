import React from 'react'
import { auth } from "@clerk/nextjs/server";
import prisma from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { clerkClient } from '@/lib/clerk-server';
import TipTapEditor from '@/components/TipTapEditor';

type Props = {
    params: { noteId: string; }
}

const NotebookPage = async ({ params }: Props) => {
    const { noteId } = await Promise.resolve(params);
    // Check if user is logged in
    const { userId } = await auth();
    if (!userId) {
        return redirect('/dashboard');
    }

    const user = await clerkClient.users.getUser(userId);
    let user_name = user.firstName + " " + user.lastName;
    if (user.firstName == null || user.lastName == null) {
        user_name = user.username || user.emailAddresses[0].emailAddress;
    }


    const notes = await prisma.note.findUnique({
        where: {
            id: noteId,
            userId: userId
        }
    });

    if (!notes) {
        return redirect('/dashboard');
    }

    const note = notes;

    return (
        <div className="grainy min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className='flex flex-row items-center border shadow-xl border-stone-200 rounded-lg p-4'>
                    <Link href="/dashboard">
                        <Button className="bg-green-600" size='sm'>
                            <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={3} />
                            Back
                        </Button>
                    </Link>
                    <div className='ml-6'>
                        <span className='font-semibold'>{user_name}</span>
                        <span className='inline-block mx-1'>/</span>
                        <span className='text-stone-500 font-semibold'>{note.title}</span>
                    </div>
                    {/* TODO: Delete button  */}
                </div>
                <div className="mt-8 border shadow-xl border-stone-200 rounded-lg px-8 py-8 w-full">
                    {/* Editor */}
                    <TipTapEditor />
                </div>
            </div>
        </div>
    )
}

export default NotebookPage