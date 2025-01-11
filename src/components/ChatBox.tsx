'use client'
import { MessageCircleMore } from 'lucide-react';
import React, { useState } from 'react'
import AIChatBot from './AIChatBot';

/*
    Description ->  React Component for chat box button.
*/
function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
        
    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='fixed bottom-5 right-0 md:right-5 z-50 p-1'>
            {!isOpen ?
                <button
                    onClick={toggleChatBox}
                    className='bg-green-600 text-white px-4 py-4 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition'
                    aria-label='Open Chat Bot'
                    title='Open Chat Bot'
                >
                    <MessageCircleMore className='h-5 w-5' />
                </button>
                :
                <AIChatBot open={isOpen} onClose={toggleChatBox} messages={messages} setMessages={setMessages}/>
            }
        </div>
    )
}

export default ChatBox