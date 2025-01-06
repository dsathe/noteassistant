import prisma from '@/lib/db/prisma';

/*
    Description -> Get note by user and noteId
    Input -> userId and noteId
    Output -> note
*/
export async function getNoteByUserAndNoteId(userId: string, noteId: string) {
    return await prisma.note.findUnique({
        where: {
            id: noteId,
            userId: userId
        }
    })
}

/*
    Description -> Get all notes of user
    Input -> userId
    Output -> array of notes
*/
export async function getAllNotesOfUser(userId: string) {
    return await prisma.note.findMany({
        where: {
            userId: userId
        }
    });
}

/*
    Description -> Get note by noteId
    Input -> noteId
    Output -> note
*/
export async function getNodeByNoteId(noteId: string) {
    return await prisma.note.findMany({
        where: {
            id: noteId
        }
    })
}


/*
    Description -> Creating a note
    Input -> userId, title, content, cover image url
    Output -> None
*/
export async function createNote(userId: string, title: string, content: string, notecolor: string, coverImageUrl: string) {
    return await prisma.note.create({
        data: {
            title: title,
            content: content,
            userId: userId,
            notecolor: notecolor,
            coverImageUrl: coverImageUrl
        }
    })
}

/*
    Description -> Updating the cover image of a note
    Input -> noteId, cover image url
    Output -> None
*/
export async function updateCoverImage(noteId: string, coverImageUrl: string) {
    return await prisma.note.update({
        where: {
            id: noteId
        },
        data: {
            coverImageUrl: coverImageUrl
        }
    })
}

/*
    Description -> Updating the content of a note
    Input -> noteId, content
    Output -> None
*/
export async function updateContent(noteId: string, content: string) {
    return await prisma.note.update({
        where: {
            id: noteId
        },
        data: {
            content: content
        }
    })
}

/*
    Description -> Deleting a note
    Input -> noteId
    Output -> None
*/
export async function deleteNote(noteId: string) {
    return await prisma.note.delete({
        where: {
            id: noteId
        }
    })
}

/*
    Description -> Get notes by specific noteIds
    Input -> noteIds
    Output -> array of notes
*/
export async function getNotesByIds(noteIds: string[]) {
    return await prisma.note.findMany({
        where: {
            id: {
                in: noteIds
            }
        }
    })
}

/*
    Description -> Toggle favorite of a note
    Input -> noteId, isFavorited
    Output -> None
*/
export async function toggleFavorite(noteId: string, isFavorited: boolean) {
    return await prisma.note.update({
        where: {
            id: noteId
        },
        data: {
            isFavorited: !isFavorited
        }
    })
}