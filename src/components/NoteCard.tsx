import { Note } from '@prisma/client'
import React from 'react';

type Props = {
    note: Note
}

const NoteCard = (props: Props) => {
    const numbers = [30, 80, 130, 250];
    var randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    let len = 0;
    if (props.note.content != undefined) {
        len = props.note.content.replace(/(<([^>]+)>)/ig, '').length;
    }

    return (
        <div className={`rounded overflow-hidden break-inside-avoid shadow-lg w-170 hover:shadow-xl transition hover:-translate-y-1 p-4 mb-4 ${props.note.notecolor}`}>
            <a href={`/notebook/${props.note.id}`} key={props.note.id} className='w-160'>
                <div className='p-1'>
                    <h3 className='text-xl font-bold text-gray-750 mb-2'>{props.note.title}</h3>
                    <hr style={{ height: "2px", backgroundColor: 'black', border: "none" }} />
                </div>
                <div className='p-1 w-150'>
                    <p className='text-gray-800 text-base overflow-hidden'>{props.note.content?.replace(/(<([^>]+)>)/ig, '').slice(0, randomNumber)}</p>
                    <br />
                    <p className='text-sm text-gray-350'>
                        {new Date(props.note.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                        })}
                    </p>
                </div>
            </a>
        </div>
    )
}

export default NoteCard;