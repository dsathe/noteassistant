'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';
import TipTapEditor from '@/components/TipTapEditor';
import CoverImageModal from '@/components/CoverImageModal';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';
type Props = {
    note: any;
    userName: string;
};

/*
    Description -> Client component for editor to edit and view a note
*/
const EditorClient = ({ note, userName }: Props) => {
    const [coverImage, setCoverImage] = useState(note.coverImageUrl || '');
    const [showCoverModal, setShowCoverModal] = useState(false);
    const { toast } = useToast();

    const toggleModal = () => {
        setShowCoverModal(!showCoverModal);
    };

    const handleImageSelect = async (newImageUrl: string) => {
        try {
            setCoverImage(newImageUrl);
            const response = await fetch(`/api/updateCoverImage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ noteId: note.id, newImageUrl }),
            })
            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Failed to update cover image.');
            }
            setShowCoverModal(false);
            
            toast({
                variant: "success",
                description: "Cover image updated successfully.",
            });
        } catch (error) {
            console.error("Error updating cover image:", error);
            toast({
                variant: "destructive",
                description: "Error updating the cover image.",
            });
        }
    };

    return (
        <div className="relative min-h-screen">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-72 overflow-hidden z-0">
                <img
                    src={coverImage || 'https://dummyimage.com/1200x400/ffffff/fff.png'}
                    alt="Cover"
                    className="w-full h-full object-center object-cover"
                    
                />
                <button
                    onClick={toggleModal}
                    className="fixed bottom-4 right-4 z-20 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition"
                >
                    <Pencil size={24} strokeWidth={1.5} />
                </button>
            </div>

            <div className="grainy min-h-screen p-8 pt-64">
                <div className="max-w-4xl mx-auto">
                    <div className='flex flex-row items-center bg-stone-50 border shadow-xl border-stone-200 rounded-lg p-4 relative z-10'>
                        <Link href="/dashboard">
                            <Button className="bg-green-600" size='sm'>
                                <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={3} />
                                Back
                            </Button>
                        </Link>
                        <div className='ml-6'>
                            <span className='font-semibold'>{userName}</span>
                            <span className='inline-block mx-1'>/</span>
                            <span className='text-stone-500 font-semibold'>{note.title}</span>
                        </div>
                        <div className='ml-auto'>
                            <DeleteButton noteId={note.id} />
                        </div>
                    </div>
                    <div className="mt-8 border shadow-xl bg-stone-50 border-stone-200 rounded-lg px-8 py-8 w-full">
                        <TipTapEditor note={note} />
                    </div>
                </div>
            </div>

            {showCoverModal && (
                <CoverImageModal
                    onClose={toggleModal}
                    onImageSelect={handleImageSelect}
                />
            )}
        </div>
    );
};

export default EditorClient;
