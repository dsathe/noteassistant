import { deleteNote } from "@/lib/services/note-service";
import { NextResponse } from "next/server";

/*
    Input -> POST request with noteId in the body
    Output -> Send a prisma request to delete a note entry in the database
    Description -> Creating deleteNote endpoint to delete a note in the mongodb database
*/
export async function POST(req: Request) {
    try {
        const { noteId } = await req.json();
        if (!noteId) {
            return NextResponse.json('Missing noteId', { status: 400 });
        }
        await deleteNote(noteId);
        return NextResponse.json({
            success: true
        }, { status: 200 });
    } catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}