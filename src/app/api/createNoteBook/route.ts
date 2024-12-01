// /api/createNoteBook

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