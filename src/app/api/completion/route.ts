import { generateTextCompletion } from "@/lib/huggingface";

// /api/completion
/*
    Input -> POST request with prompt in the body
    Output -> Send a request to hugging face text completion utility to get text stream.
    Description -> Creating a data stream for autocomplete and sending it one by one
*/

export async function POST(req: Request) {

    const { prompt } = await req.json();

    const res = await generateTextCompletion(prompt);

    return res;
}