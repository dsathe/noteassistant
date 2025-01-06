import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';
import CreateNoteDialog from '@/components/CreateNoteDialog';
import { auth } from '@clerk/nextjs/server';
import { Note } from '@prisma/client';
import { getAllNotesOfUser } from '@/lib/services/note-service';
import { redirect } from 'next/navigation';
import ChatBox from '@/components/ChatBox';
import DisplayNotes from '@/components/DisplayNotes';
import NavbarComponents from '@/components/NavbarComponents';

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
                    <NavbarComponents />
                    <div className="mt-8 mb-8">
                        <Separator />
                    </div>
                    <CreateNoteDialog />
                    <DisplayNotes initialNotes={notes} />
                </div>
                <ChatBox />
            </div>
        </>
    )
}

export default DashboardPage