// /api/createNoteBook
/*
    Input -> POST request with name in the body
    Output -> Send a prisma request to create new note entry in the database
    Description -> Creating createNoteBook endpoint to create a note entry in the mongodb database
*/

import prisma from "@/lib/db/prisma";
import { createNoteSchema } from "@/lib/validation/note";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse('unauthorised', { status: 401 });
    }
    const body = await req.json();
    const { name } = body;
    console.log("body is " + body);
    console.log("name is " + name);
    //console.log("userid is " + userId);
    const content = "";
    const title = name;
    const note = await prisma.note.create({
        data: {
            title,
            content,
            userId,
        },
    })
    return NextResponse.json({ note }, { status: 201 });
}