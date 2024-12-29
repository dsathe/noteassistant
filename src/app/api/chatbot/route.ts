import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { generateEmbedding, generateTextResponse } from "@/lib/huggingface";
import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getNotesByIds } from "@/lib/services/note-service";

/*
    Input -> POST request with message and past messages (for context) in the body
    Output -> Generate text response for the prompt
    Description -> Using Huggingface to generate text response for the prompt using pinecone to find relevant notes
*/
export async function POST(req: Request) {
    try { 
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('unauthorised', { status: 401 });
        }
        const body = await req.json();
        let { message, previousMessages } = body;

        const convoEmbedding = await generateEmbedding(previousMessages.join('\n'));

        const queryResult = await notesIndex.query({
            vector: convoEmbedding,
            topK: 2,
            includeMetadata: true,
            filter: {
                userId: userId
            },
        })

        const noteIds = queryResult.matches?.map((match) => match.id) || [];

        const notes = await getNotesByIds(noteIds);
        if (!notes) {
            return new NextResponse('Note not found', { status: 401 });
        }
        console.log(notes); 
        const noteContentWithoutTags = notes.map((note) => note.content?.replace(/<[^>]*>/g, ' ')).join('\n');
        const relevantNotes = noteContentWithoutTags;
        console.log(relevantNotes);
        const prompt = `You're a chatbot that answers questions based on the conversation so far:\n${previousMessages.join('\n')}\n\nContext:\n${relevantNotes}\n\nQuestion:\n${message}\n\nAnswer (keep the answer within the context and in a simple sentence and less than 30 words):`;
        
        const response = await generateTextResponse(prompt);

        return NextResponse.json({ 
            reply: response
        }, { status: 200 });
    }
    catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json({ 
            success: false 
        }, { status: 500 });
    }
}