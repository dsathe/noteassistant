import { Note } from '@prisma/client'
import React from 'react';
import DeleteButton from '@/components/DeleteButton';
import FavoritesButton from './FavoritesButton';

type Props = {
    note: Note;
    onToggleFavorite: (noteId: string) => void;
}

const NoteCard = ({ note, onToggleFavorite }: Props) => {
    const numbers = [30, 80, 130, 250];
    var randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    let len = 0;
    if (note.content != undefined) {
        len = note.content.replace(/(<([^>]+)>)/ig, '').length;
    }

    return (
        <div className={`rounded overflow-hidden break-inside-avoid shadow-lg w-170 hover:shadow-xl transition hover:-translate-y-1 p-4 mb-4 ${note.notecolor}`}>
            <a href={`/notebook/${note.id}`} key={note.id} className='w-160'>
                <div className='p-1'>
                    <h3 className='text-xl font-bold text-gray-750 mb-2'>{note.title}</h3>
                    <hr style={{ height: "2px", backgroundColor: 'black', border: "none" }} />
                </div>
                <div className='p-1 w-150'>
                    <p className='text-gray-800 text-base overflow-hidden'>{note.content?.replace(/(<([^>]+)>)/ig, '').slice(0, randomNumber)}</p>
                    <br />
                </div>
            </a>
            <div className='flex flex-row justify-between items-end'>
                <p className='text-sm text-gray-350'>
                    {new Date(note.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                    })}
                </p>
                <div className='flex flex-row gap-2'>
                    <FavoritesButton noteId={note.id} initialIsFavorited={note.isFavorited} onToggleFavorite={onToggleFavorite} />
                    <DeleteButton noteId={note.id} />
                </div>
            </div>
        </div>
    )
}

export default NoteCard;