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
import { common, createLowlight } from 'lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import 'highlight.js/styles/atom-one-dark.css';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';
import { useCompletion } from 'ai/react';
import { useToast } from "@/hooks/use-toast";

type Props = {
    note: any;
}
/*
    Description ->  React Component for creating a TipTap Editor.
*/
// creating lowlight obj for highlighting common languages
const lowlight = createLowlight(common);

const TipTapEditor = ({ note }: Props) => {
    const [content, setContent] = React.useState(note.content || 'Start typing...');
    const [savedflag, setSavedFlag] = React.useState(true);
    const [pos, setPos] = React.useState(0);
    const { toast } = useToast();
    const saveNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/saveNote', {
                noteId: note.id,
                content
            });
            return response.data;
        },
    });

    // Make use of useCompletion to get text stream from AI model and add it to the text one by one.
    const { complete, completion, setCompletion } = useCompletion({
        api: "/api/completion",
        async onResponse(response) {
            if (response !== null && response.body != null) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let chunk;
                try {
                    while (!(chunk = await reader.read()).done) {
                        const text = decoder.decode(chunk.value);
                        setCompletion(text);
                    }
                }
                catch (error) {
                    console.error("Error while streaming " + error);
                }
                finally {
                    reader.releaseLock();
                }
            }
        },
        async onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to generate content. Please try again later.",
            });
        }
    });

    // Create a Shortcut for keyboard to call autocomplete
    // Create a Shortcut for saving the content
    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'Shift-a': () => {
                    const prompt = this.editor.getText().split(' ').slice(-30).join(' ');
                    const cursorposition = this.editor.state.selection.$anchor.pos;
                    setPos(cursorposition);
                    complete(prompt);
                    return true;
                },
                'Control-s': () => {
                    saveNote.mutate(undefined, {
                        onSuccess: data => {
                            setSavedFlag(true);
                        },
                        onError: error => {
                            return false;
                        }
                    })
                    return true;
                },
                'Cmd-s': () => {
                    saveNote.mutate(undefined, {
                        onSuccess: data => {
                            setSavedFlag(true);
                        },
                        onError: error => {
                            return false;
                        }
                    })
                    return true;
                }
            }
        },
    })

    const editor = useEditor({
        autofocus: true,
        extensions: [
            StarterKit,
            customText,
            Underline,
            CodeBlockLowlight.configure({ lowlight }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
            setSavedFlag(false);
        },
        immediatelyRender: false
    })
    const debouncedContent = useDebounce(content, 30000);
    useEffect(() => {
        if (debouncedContent === '') return
        saveNote.mutate(undefined, {
            onSuccess: data => {
                setSavedFlag(true);
            },
            onError: error => {
            }
        })
    }, [debouncedContent]);

    // Adding use effect to add content to the text whenever completion variable is changed
    React.useEffect(() => {
        editor?.commands.insertContentAt(pos, completion);
        setPos(pos + completion.length);
    }, [completion]);

    return (
        <>
            <div className='flex flex-col sm:flex-row gap-6 sm:gap-0 sm:justify-between'>
                {editor && <TipTapMenuBar editor={editor} />}
                <Button disabled variant={'outline'} className={`${!savedflag ? !saveNote.isPending ? 'bg-red-500 text-white': '' : 'bg-green-500 text-white'}`}>
                    {!saveNote.isPending && savedflag && 'Saved'}
                    {!savedflag && !saveNote.isPending && 'Unsaved'}
                    {saveNote.isPending && 'Saving'}
                    {saveNote.isPending && <span className="animate-spin ml-1" ><LoaderPinwheel className="h-4 w-4" /></span>}
                </Button>
            </div>
            <div className='prose w-full mt-4'>
                <EditorContent editor={editor} />
                {/* Optional: Add floating/bubble menu */}
            </div>
            <div className='h-4'></div>
            <span className='text-sm text-gray-800'>Tip :-</span>
            <br />
            <span className='text-sm text-gray-800'>
                Press
                <kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg ml-2 mr-2'>
                    Shift + A
                </kbd>
                for AI autocomplete
            </span>
            <br />
            <span className='text-sm text-gray-800'>
                Press
                <kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg ml-2 mr-2'>
                    Cmd + S
                </kbd>
                or
                <kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg ml-2 mr-2'>
                    Ctrl + S
                </kbd>
                for saving
            </span>
        </>

    )
}

export default TipTapEditor