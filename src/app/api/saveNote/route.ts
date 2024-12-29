import { NextResponse } from "next/server";
import { getNodeByNoteId } from "@/lib/services/note-service";
import { generateEmbedding } from "@/lib/huggingface";
import { notesIndex } from "@/lib/db/pinecone";
import  prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";

/*
    Input -> POST request with noteId and content in the body
    Output -> Send a prisma request to create new note entry in the database
    Description -> Creating saveNote endpoint to save a note in the mongodb database
*/
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('unauthorised', { status: 401 });
        }
        const body = await req.json();
        let { noteId, content } = body;
        if (!noteId || !content) {
            return new NextResponse('Missing content or noteId', { status: 401 });
        }

        const notes = await getNodeByNoteId(noteId);

        if (!notes) {
            return new NextResponse('Note not found', { status: 401 });
        }
        if (notes.length != 1) {
            return new NextResponse('Failed to update note', { status: 401 });
        }

        const note = notes[0];

        if (note.content !== content) {
            const embedding = await generateEmbedding(note.title + " " + content);
            const result = await prisma.$transaction(async (tx) => {
                const note = await tx.note.update({
                    where: {
                        id: noteId
                    },
                    data: {
                        content: content
                    }
                });
                await notesIndex.upsert([{
                    id: noteId,
                    values: embedding,
                    metadata: {userId}
                }]);
                return note;
            })
            if (!result) {
                return new NextResponse('Failed to update note', { status: 401 });
            }
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