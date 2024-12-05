'use client'
import React, { use, useEffect } from 'react';
import { EditorContent, useEditor, BubbleMenu, FloatingMenu } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import TipTapMenuBar from '@/components/TipTapMenuBar';
import { Button } from './ui/button';
import Underline from '@tiptap/extension-underline';
import { useDebounce } from '@/lib/useDebounce';
type Props = {}

const TipTapEditor = (props: Props) => {
    const [editorState, setEditorState] = React.useState('Start typing...');
    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit, Underline],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML());
        }
    })
    const debouncedEditorState = useDebounce(editorState, 1000);
    useEffect(() => {
        // TODO: save to db
    }, [debouncedEditorState]);

    return (
        <>
            <div className='flex flex-row justify-between'>
                {editor && <TipTapMenuBar editor={editor} />}
                <Button>Save</Button>
            </div>
            <div className='prose'>
                <EditorContent editor={editor} />
                {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
            </div>
        </>

    )
}

export default TipTapEditor