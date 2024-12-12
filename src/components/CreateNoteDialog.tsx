'use client'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Loader2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Mutation, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

/*
    Description ->  React Component for creating dialog box to create new note.
                    It sends a POST request to the database.
*/

type Props = {}

const CreateNoteDialog = (props: Props) => {

    const [input, setInput] = React.useState('');
    const [selectedcolorcode, setColorcode] = React.useState('bg-emerald-200');
    const colorpallette = ["bg-emerald-200", "bg-amber-300", "bg-violet-300", "bg-rose-400", "bg-orange-300"]
    const router = useRouter();
    const createNotebook = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/createNoteBook', {
                name: input,
                notecolor: selectedcolorcode
            });
            return response.data;
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input === '') {
            window.alert("Please enter a name for the note");
            return;
        }
        createNotebook.mutate(undefined, {
            onSuccess: ({ note }) => {
                console.log("Successfully created a note");
                router.push(`/notebook/${note.id}`);
            },
            onError: (error) => {
                console.error(error);
            }
        })
    };

    return (
        <Dialog>
            <DialogTrigger>
                <div className='border-dashed border-2 border-green-600 h-full rounded-lg items-center justify-center sm:flex-cl hover:shadow-xl transition hover:-translate-y-1 flex-row p-4'>
                    <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
                    <h2 className='font-semibold text-green-600 sm:mt-2'>New Note</h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Note</DialogTitle>
                    <DialogDescription>
                        Create a new note by clicking the button below
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Name ...' />
                    <div className='h-4'></div>
                    <h4 className='font-semibold text-grey-600 mb-1'>Color</h4>
                    {colorpallette.map((color) => (
                        <label key={color.split('-')[1]} className="inline-flex mr-2">
                            <input
                                type="radio"
                                name="color"
                                value={color}
                                checked={selectedcolorcode === color}
                                onChange={(e) => setColorcode(e.target.value)}
                                className='mr-2'
                            />
                            <p className={`w-8 h-8 ${color} rounded-full inline flex justify-center items-center mr-5`}>
                            </p>
                        </label>
                    ))}
                    <br />
                    <br />
                    <div className='flex items-center gap-2'>
                        <Button type='reset' variant={'secondary'}>Cancel</Button>
                        <Button type="submit" className='bg-green-600' disabled={createNotebook.isPending}>
                            {createNotebook.isPending && (
                                <Loader2 className='w-4 h-4 mr-2 animate spin' />
                            )}
                            Submit</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNoteDialog;