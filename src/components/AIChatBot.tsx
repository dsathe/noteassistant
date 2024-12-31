import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Bot, Trash2, User, X } from 'lucide-react';
import { Input } from './ui/input';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/*
    Description -> AI chatbot component that handles the conversation between the user and the AI chatbot.
*/

interface AIChatBotProps {
    open: boolean;
    onClose: () => void;
    messages: string[];
    setMessages: (messages: string[]) => void;
}

function AIChatBot({ open, onClose, messages, setMessages }: AIChatBotProps) {
    const [inputMessage, setInputMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;
        const newMessages = [...messages, `User: ${inputMessage}`]
        setMessages(newMessages);
        setInputMessage('');
        try {
            setLoading(true);
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage,
                    previousMessages: newMessages.slice(-5),
                }),
            });
            const data = await response.json();
            if (data.reply) {
                setMessages([...newMessages, `Assistant: ${data.reply}`]);
                setLoading(false);
            }
            else {
                setLoading(false);
                setError('Failed to get reply. Please try again.');
            }
        }
        catch (error) {
            console.error(error);
            setMessages([...newMessages, `Assistant: Something went wrong. Please try again.`]);
        }
    }
    return (
        <div className='mt-2 w-[400px] h-[500px] bg-white shadow-lg border border-gray-200 p-4 flex flex-col'>
            <div className="flex justify-between items-center mb-2  ">
                <h3 className="text-lg font-semibold">Chat Assistant</h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close Chat Bot">
                    <X className="h-5 w-5" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3" ref={scrollRef}>
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} message={msg} />
                ))}
                {loading && <ChatMessage message="Assistant: Thinking..." />}
                {!loading && messages.length === 0 &&
                    <div className="flex flex-col h-full justify-center items-center italic text-gray-500 text-center gap-3">
                        <Bot />
                        Ask the AI a question about your notes
                    </div>
                }
                {error && <ChatMessage message={`Assistant: ${error}`} />}
            </div>
            <div className="flex gap-1">
                <Button
                    onClick={() => setMessages([])}
                    title='Clear Chat'
                    variant='outline'
                    size='icon'
                    className='shrink-0'
                    type='button'
                >
                    <Trash2 />
                </Button>
                <Input
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    ref={inputRef}
                />
                <Button type='button' onClick={handleSendMessage}>Send</Button>
            </div>

        </div>

    )
}

function ChatMessage({
    message
}: {
    message: String
}) {
    const { user } = useUser();
    const isAiMessage = message.startsWith("Assistant");
    const content = isAiMessage ? message.slice(11) : message.slice(6);
    return (
        <div
            className={cn(
                "mb-3 flex items-center",
                isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
            )}
        >
            {isAiMessage && <Bot className="mr-2 shrink-0" />}
            <p
                className={cn(
                    "whitespace-pre-line rounded-md border px-3 py-2",
                    isAiMessage ? "bg-background" : "bg-primary text-primary-foreground",
                )}
            >
                {content}
            </p>
            {!isAiMessage && user?.imageUrl && (
                <Image
                    src={user.imageUrl}
                    alt="User"
                    className="ml-2 shrink-0 rounded-full"
                    width={24}
                    height={24}
                />
            ) 
            }

        </div>
    )

}

export default AIChatBot