import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import Link from "next/link";
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';
import CreateNoteDialog from '@/components/CreateNoteDialog';

type Props = {}

const DashboardPage = (props: Props) => {
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
                    <div className="text-center">
                        <h2 className='text-xl text-gray-500'>No notes yet.</h2>
                    </div>

                    {/* display all notes */}
                    <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                        <CreateNoteDialog />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage