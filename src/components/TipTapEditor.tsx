'use client'
import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import TipTapMenuBar from '@/components/TipTapMenuBar';
import { Button } from './ui/button';
import Underline from '@tiptap/extension-underline';
import { useDebounce } from '@/lib/useDebounce';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderPinwheel } from 'lucide-react';
type Props = {
    note: any;
}
/*
    Description ->  React Component for creating a TipTap Editor.
*/ 
const TipTapEditor = ({ note }: Props) => {
    const [content, setContent] = React.useState(note.content || 'Start typing...');
    const saveNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/saveNote', {
                noteId: note.id,
                content
            });
            return response.data;
        },
    });

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit, Underline],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
        immediatelyRender: false
    })
    const debouncedContent = useDebounce(content, 1000);
    useEffect(() => {
        if (debouncedContent === '') return
        saveNote.mutate(undefined, {
            onSuccess: data => {
                console.log("Successfully saved note", data);
            },
            onError: error => {
                console.log("Error saving note", error);
            }
        })
    }, [debouncedContent]);

    return (
        <>
            <div className='flex flex-row justify-between'>
                {editor && <TipTapMenuBar editor={editor} />}
                <Button disabled variant={'outline'}>
                    {saveNote.isPending ? 'Saving Note' : 'Saved'}
                    {saveNote.isPending && <span className="animate-spin ml-1" ><LoaderPinwheel className="h-4 w-4" /></span>}
                </Button>
            </div>
            <div className='prose'>
                <EditorContent editor={editor} />
                {/* Optional: Add floating/bubble menu */}
            </div>
        </>

    )
}

export default TipTapEditor