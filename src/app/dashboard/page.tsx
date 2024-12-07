import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import Link from "next/link";
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';
import CreateNoteDialog from '@/components/CreateNoteDialog';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db/prisma';
import { NextResponse } from "next/server";
import { Note } from '@prisma/client';

type Props = {}

/*
    Description ->  Creating react component to showcase dashboard with multiple notes for the user.
                    Added functionality to create new notes
*/
const DashboardPage = async (props: Props) => {
    const { userId } = await auth();
    /* Get notes from db using the userId*/
    if (!userId) {
        return new NextResponse('unauthorised', { status: 401 });
    }
    const notes: Note[] = await prisma.note.findMany({
        where: {
            userId: userId,
        }
    });
    console.log("Notes are " + notes.length);
    console.log(notes);

    return (
        <>
            <div className="grainy min-h-screen">
                <div className="max-w-7xl mx-auto p-10">
                    <div className="mt-10 flex justify-between items-center md:flex-row flex-col">
                        <div className="flex items-center justify-between w-full">
                            <Link href='/'>
                                <Button className="bg-green-600 font-semibold" size="sm">
                                    <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={3} />
                                    Back
                                </Button>
                            </Link>
                            <h1 className="mx-auto text-3xl font-bold text-gray-900">My Notes</h1>
                            <div>
                                <UserButton />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 mb-8">
                        <Separator />
                    </div>
                    {/* TODO: Loop to render notes */}
                    {notes.length === 0 && (
                        <div className="text-center">
                            <h2 className='text-xl text-gray-500'>No notes yet.</h2>
                        </div>
                    )}

                    {/* display all notes */}
                    <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                        <CreateNoteDialog />
                        {
                            notes.map(note => {
                                return (
                                    <a href={`/notebook/${note.id}`} key={note.id} className='border border-stone-900 w-170 p-2 hover:shadow-xl transition hover:-translate-y-1'>
                                        <div className='p-1'>
                                            <h3 className='text-xl font-semibold text-gray-900'>{note.title}</h3>
                                        </div>
                                        <div className='flex flex-col p-1 w-150 text-wrap'>
                                            <p className='text-gray-600 text-l overflow-hidden'>{note.content?.replace(/(<([^>]+)>)/ig, '').slice(0, 70)}</p>
                                            <br />
                                            <p className='text-sm text-gray-350'>
                                                {new Date(note.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage