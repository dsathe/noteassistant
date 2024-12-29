'use client'
import { MessageCircleMore, X } from 'lucide-react';
import React, { useState } from 'react'
import AIChatBot from './AIChatBot';

/*
    Description ->  React Component for chat box button.
*/
function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='fixed bottom-5 right-5 z-50 p-1'>
            {!isOpen ?
                <button
                    onClick={toggleChatBox}
                    className='bg-green-600 text-white px-4 py-2 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition'
                    aria-label='Open Chat Bot'
                >
                    <MessageCircleMore className='h-5 w-5' />
                </button>
                :
                <AIChatBot open={isOpen} onClose={toggleChatBox} />
            }
        </div>
    )
}

export default ChatBox