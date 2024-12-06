import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

/*
    Input -> POST request with noteId and content in the body
    Output -> Send a prisma request to create new note entry in the database
    Description -> Creating saveNote endpoint to save a note in the mongodb database
*/
export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { noteId, content } = body;
        if (!noteId || !content) {
            return new NextResponse('Missing content or noteId', { status: 401 });
        }

        const notes = await prisma.note.findMany({
            where: {
                id: noteId,
            },
        });

        if (!notes) {
            return new NextResponse('Note not found', { status: 401 });
        }

        if (notes.length != 1) {
            return new NextResponse('Failed to update note', { status: 401 });
        }

        const note = notes[0];

        if (note.content !== content) {
            await prisma.note.update({
                where: {
                    id: noteId,
                },
                data: {
                    content: content
                }
            });
        }
        return NextResponse.json({
            success: true
        }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            success: false
        }, { status: 500 });
    }
}