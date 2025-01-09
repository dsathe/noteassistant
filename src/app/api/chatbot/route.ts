import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { generateEmbedding, generateTextResponse } from "@/lib/huggingface";
import { notesIndex } from "@/lib/db/pinecone";
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
        const relevantNotes = notes.map((note) => `Title: ${note.title}\nContent: ${note.content?.replace(/<[^>]*>/g, ' ')}`).join('\n');

        const prompt =
            'You are a part of an AI powered note-taking application where users can create notes with content. Your task is to answer questions ONLY on the basics of the conversation so far and relevant notes I have found.\n\n' +
            "The relevant notes for this question are:\n\n" +
            `${relevantNotes}\n\n` +
            "The conversation you have had so far is (use this to gain context to answer the question):\n\n" +
            `${previousMessages.join('\n')}\n\n` +
            "The question is:\n\n" +
            `${message}\n\n` +
            "Please keep the tone consistent with the rest of the text and keep the response within 20 words and with complete sentences. If you cannot answer the question, please say 'I'm sorry, I don't know.'\n\n" +
            "DO NOT REPEAT WITH THIS PROMPT, just give the answer:\n\n" +
            "Your answer:";

        const response = await generateTextResponse(prompt);
        let yourAnswerIndex = response.indexOf('Your answer:');
        let generatedAnswer = response;
        if (yourAnswerIndex !== -1) {
            generatedAnswer = response.slice(yourAnswerIndex + 12, response.length);
        }
        return NextResponse.json({
            reply: generatedAnswer
        }, { status: 200 });
    }
    catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json({
            success: false
        }, { status: 500 });
    }
}