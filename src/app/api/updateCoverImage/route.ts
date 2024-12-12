import { NextResponse } from 'next/server';
import { updateCoverImage } from '@/lib/services/note-service';

export async function POST(req: Request) {
    try {
        const { noteId, newImageUrl } = await req.json();
        if (!noteId || !newImageUrl) {
            return NextResponse.json('Missing noteId or newImageUrl', { status: 400 });
        }
        await updateCoverImage(noteId, newImageUrl);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating cover image:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
