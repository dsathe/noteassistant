'use client';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';

type Props = {
    noteId: string
    initialIsFavorited: boolean
    onToggleFavorite?: (noteId: string) => void 
}

/*
    Description -> React Component for favoriting a note
*/

const FavoritesButton = ({ noteId, initialIsFavorited, onToggleFavorite }: Props) => {
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const [loading, setLoading] = useState(false);

    const toggleFavorite = async () => {
        setLoading(true);
        try{
            const response = await fetch('/api/toggleFavorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    noteId: noteId,
                    isFavorited: isFavorited
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to toggle favorite');
            }
            setIsFavorited(!isFavorited);
            if (onToggleFavorite) onToggleFavorite(noteId);
            toast({
                variant: "default",
                description: isFavorited ? "Successfully unfavorited a note." : "Successfully favorited a note.",
            })
        }
        catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Failed to favorite a note. Please try again later.",
            })
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Button size='sm'
            variant='outline'
            onClick={toggleFavorite}
            disabled={loading}
            className='cursor-pointer'
        >
            {isFavorited ? <Heart size={16} fill='red' className='text-red-500' /> : <Heart size={16} />
            }
        </Button>
    )
}

export default FavoritesButton