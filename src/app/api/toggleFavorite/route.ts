import { NextResponse } from "next/server";
import { toggleFavorite } from "@/lib/services/note-service";

/*
    Input -> POST request with noteId in the body
    Output -> Send a prisma request to toggle isFavorited of note in the database
    Description -> Toggling isFavorited of note in the database
*/
export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { noteId, isFavorited } = body;
        if (!noteId) {
            return NextResponse.json('Missing noteId', { status: 400 });
        }
        await toggleFavorite(noteId, isFavorited);
        return NextResponse.json({
            success: true
        }, { status: 200 });

    } catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}