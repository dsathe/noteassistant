'use client'
import { Note } from '@prisma/client'
import React, { useState, useMemo, useEffect } from 'react'
import NoteCard from './NoteCard'
import { useSearchStringStore } from '@/stores/searchstore';

interface Props {
    initialNotes: Note[]
}

/*
    Description ->  Creating react component to handle the display of notes
*/

const DisplayNotes = ({ initialNotes }: Props) => {
    const [notes, setNotes] = useState(initialNotes);
    const { searchstring, update } = useSearchStringStore();

    useEffect(() => {
        if (searchstring.searchvalue == "") {
            setNotes(initialNotes);
        }
        else {
            let fnotes = searchstring.searchvalue
                ? initialNotes.filter(note =>
                    note.title.toLowerCase().includes(searchstring.searchvalue.toLowerCase())
                    ||
                    note.content?.toLocaleLowerCase().replace(/(<([^>]+)>)/ig, '').includes(searchstring.searchvalue.toLowerCase())
                )
                : initialNotes;
            setNotes(fnotes);
        }
    }, [searchstring.searchvalue]);

    const toggleFavorite = (noteId: string) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === noteId ? { ...note, isFavorited: !note.isFavorited } : note
            )
        );
    };

    const sortedNotes = useMemo(() => {
        return [...notes].sort((a, b) => {
            if (a.isFavorited && !b.isFavorited) return -1;
            if (!a.isFavorited && b.isFavorited) return 1;
            return 0;
        });
    }, [notes]);



    return (
        <>
            <>
                {
                    notes.length === 0 && (
                        <div className="text-center">
                            <h2 className='text-xl text-gray-500 mt-5'>No notes.</h2>
                        </div>
                    )
                }

                {/* display all notes */}
                <br />
                <div className='h-1 p-4'>
                </div>
                <div className='columns-1 sm:columns-3 md:columns-5 col-gap-3 row-gap-3'>
                    {
                        sortedNotes.map(note => {
                            return (
                                <NoteCard note={note} key={note.id} onToggleFavorite={toggleFavorite} />
                            )
                        })
                    }
                </div>
            </>
        </>
    )
}

export default DisplayNotes