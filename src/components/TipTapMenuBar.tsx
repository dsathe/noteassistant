"use client";
import React from 'react'
import { Editor } from '@tiptap/react';
import {
    Bold,
    Italic,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Underline,
    Code,
    List,
    ListOrdered,
    Quote,
    Redo,
    Undo,
    Codepen,
    Table,
    TableCellsSplit,
    TableCellsMerge,
    PanelRightClose,
    PanelLeftClose,
    PanelTopClose
} from 'lucide-react';
import Image from 'next/image';

// import { Button } from './ui/button';

type Props = {
    editor: Editor;
}

/*
    Description -> Creating the Menu Bar for the Editor
*/
const TipTapMenuBar = ({ editor }: Props) => {

    return (
        <div>
            <div className='flex flex-wrap gap-2'>
                <button onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                    title='Bold'
                >
                    <Bold className='h-6 w-6' />
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                    title='Italic'
                >
                    <Italic className='h-6 w-6' />
                </button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                    title='Underline'
                >
                    <Underline className='h-6 w-6' />
                </button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                    title='Strike'
                >
                    <Strikethrough className='h-6 w-6' />
                </button>
                <button onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                    title='Quote'
                >
                    <Code className='h-6 w-6' />
                </button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    title='Heading 1'
                >
                    <Heading1 className='h-6 w-6' />
                </button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    title='Heading 2'
                >
                    <Heading2 className='h-6 w-6' />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
                    title='Heading 3'
                >
                    <Heading3 className="w-6 h-6" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
                    title='Heading 4'
                >
                    <Heading4 className="w-6 h-6" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
                    title='Heading 5'
                >
                    <Heading5 className="w-6 h-6" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
                    title='Heading 6'
                >
                    <Heading6 className="w-6 h-6" />
                </button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                    disabled={!editor.can().chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                    title='Unordered list'
                >
                    <List className='h-6 w-6' />
                </button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                    title='Ordered list'
                >
                    <ListOrdered className='h-6 w-6' />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive("codeBlock") ? "is-active" : ""}
                    title='Insert Code Block'
                >
                    <Codepen className="w-6 h-6" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive("blockquote") ? "is-active" : ""}
                    title='Block Quote'
                >
                    <Quote className="w-6 h-6" />
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    title='Undo'
                >
                    <Undo className="w-6 h-6" />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    title='Redo'
                >
                    <Redo className="w-6 h-6" />
                </button>
            </div>
            <div className='flex flex-wrap gap-2 mt-1'>
                <button
                    onClick={() => editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()}
                    title='Create Table'
                >
                    <Table className=' h-6 w-6' />
                </button>
                <button onClick={() => editor.chain().focus().addColumnAfter().run()} title='Add Column'><Image src='/icons/add-column-svg.svg' alt='del' width={17} height={18} /></button>
                <button onClick={() => editor.chain().focus().deleteColumn().run()} title='Delete Column'><Image src='/icons/delete-column-svg.svg' className='h-5 w-6' alt='del' width={18} height={18} /></button>
                <button onClick={() => editor.chain().focus().addRowBefore().run()} title='Add Row'><Image src='/icons/add-row-svg.svg' className='h-6 w-6' width={20} height={20} alt='del' /></button>
                <button onClick={() => editor.chain().focus().deleteRow().run()} title='Delete Row'><Image src='/icons/delete-row-svg.svg' className='h-6 w-6' width={20} height={20} alt='del' /></button>
                <button onClick={() => editor.chain().focus().mergeCells().run()} title='Merge Cells'><TableCellsMerge className='w-6 h-6' /></button>
                <button onClick={() => editor.chain().focus().splitCell().run()} title='Split Cells'><TableCellsSplit className='h-6 w-6' /></button>
                <button onClick={() => editor.chain().focus().deleteTable().run()} title='Delete Table'><Image src='/icons/table-delete-svg.svg' className='h-6 w-6 mt-1' width={20} height={20} alt='del' /></button>
            </div>
        </div>
    )
}

export default TipTapMenuBar