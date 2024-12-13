// /api/createNoteBook
/*
    Input -> POST request with name in the body
    Output -> Send a prisma request to create new note entry in the database
    Description -> Creating createNoteBook endpoint to create a note entry in the mongodb database
*/

import { createNoteSchema } from "@/lib/validation/note";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createNote } from "@/lib/services/note-service";

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse('unauthorised', { status: 401 });
    }
    const body = await req.json();
    const name = body['name'];
    const notecolor = body['notecolor'];
    const coverImageUrl = body['coverImageUrl'];
    const content = "";
    const title = name;
    const note = await createNote(userId, title, content, notecolor, coverImageUrl);
    return NextResponse.json({ note }, { status: 201 });
}