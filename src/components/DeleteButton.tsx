'use client';
import React from 'react';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

type Props = {
    noteId: string
}

/*
    Description -> React Component for deleting a note
    Input -> noteId
*/

const DeleteButton = ({ noteId }: Props) => {
    const router = useRouter()
    const deleteNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/deleteNote', {
                noteId
            });
            return response.data;
        }
    })
    return (
        <Button variant="destructive" size='sm'
            onClick={() => {
                const confirm = window.confirm('Are you sure you want to delete this note?')
                if (!confirm) return
                deleteNote.mutate(undefined, {
                    onSuccess: () => {
                        toast({
                            variant: "success",
                            description: "Successfully deleted a note.",
                        })
                        router.push('/dashboard');
                    },
                    onError: (error) => {
                        console.error(error);
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: "Failed to delete a note. Please try again later.",
                        });
                    }
                })
            }}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}

export default DeleteButton