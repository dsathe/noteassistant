import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { generateImageResponse } from "@/lib/huggingface";

/*
    Input -> POST request with image description in the body
    Output -> Generate image response for the prompt constructed using that description
    Description -> Using Huggingface to generate image response for the prompt
*/
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorised', { status: 401 });
        }
        const { imageDescription } = await req.json();
        if (!imageDescription) {
            return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
        }
        const prompt = "Generate a 1200 x 400 image with a description of " + imageDescription + ". Please stay within the description.";
        const response = await generateImageResponse(prompt);
        return NextResponse.json({  image: `data:image/jpeg;base64,${response}`, success: true }, { status: 200 });
    }
    catch (error) {
        console.error('Error generating image:', error);
        return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }
}

