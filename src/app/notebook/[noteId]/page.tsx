import React from 'react'
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
import { getNoteByUserAndNoteId } from "@/lib/services/note-service";
import { getUser } from "@/lib/services/user-service";
import EditorClient from '@/components/EditorClient';
type Props = {
    params: { noteId: string; }
}

/*
    Description -> Server component to render the notebook page
*/
const NotebookPage = async ({ params }: Props) => {
    const { noteId } = await Promise.resolve(params);

    // Check if user is logged in
    const { userId } = await auth();
    if (!userId) {
        return redirect('/dashboard');
    }

    const user = await getUser(userId);
    let user_name = user.firstName + " " + user.lastName;

    if (user.firstName == null || user.lastName == null) {
        user_name = user.username || user.emailAddresses[0].emailAddress;
    }

    const notes = await getNoteByUserAndNoteId(userId, noteId);

    if (!notes) {
        return redirect('/dashboard');
    }

    const note = notes;

    return (
        <div className="min-h-screen">
            <EditorClient note={note} userName={user_name} />
        </div>
    )
}

export default NotebookPage