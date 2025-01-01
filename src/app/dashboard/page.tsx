import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';
import CreateNoteDialog from '@/components/CreateNoteDialog';
import { auth } from '@clerk/nextjs/server';


import { Note } from '@prisma/client';
import NoteCard from '@/components/NoteCard';
import { getAllNotesOfUser } from '@/lib/services/note-service';
import { redirect } from 'next/navigation';
import ChatBox from '@/components/ChatBox';

type Props = {}

/*
    Description ->  Creating react component to showcase dashboard with multiple notes for the user.
                    Added functionality to create new notes
*/
const DashboardPage = async (props: Props) => {
    const { userId } = await auth();
    /* Get notes from db using the userId*/
    if (!userId) {
        console.error("Unauthorized access attempt");
        redirect('/');
    }
    const notes: Note[] = await getAllNotesOfUser(userId);

    return (
        <>
            <div className="grainy min-h-screen">
                <div className="max-w-7xl mx-auto p-10">
                    <div className="mt-10 flex justify-between items-center md:flex-row flex-col">
                        <div className="flex items-center justify-between w-full">
                            <Link href='/'>
                                <Button className="bg-green-600 font-semibold" size="sm">
                                    <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={3} />
                                    Back
                                </Button>
                            </Link>
                            <h1 className="mx-auto text-3xl font-bold text-gray-900">My Notes</h1>
                            <div>
                                <UserButton />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 mb-8">
                        <Separator />
                    </div>
                    <CreateNoteDialog />
                    
                    {notes.length === 0 && (
                        <div className="text-center">
                            <h2 className='text-xl text-gray-500 mt-5'>No notes yet.</h2>
                        </div>
                    )}

                    {/* display all notes */}
                    <br />
                    <div className='h-1 p-4'>
                    </div>
                    <div className='columns-1 sm:columns-3 md:columns-5 col-gap-3 row-gap-3'>
                        {
                            notes.map(note => {
                                return (
                                    <NoteCard note={note} key={note.id} />
                                )
                            })
                        }
                    </div>
                </div>
                <ChatBox/>
            </div>
        </>
    )
}

export default DashboardPage