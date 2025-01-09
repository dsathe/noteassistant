import { HfInference } from '@huggingface/inference';
const apiKey = process.env.HUGGINGFACE_TOKEN;

if (!apiKey) {
    throw new Error('Missing Huggingface API key');
}

const huggingfaceClient = new HfInference(apiKey);

/*
    Description -> Generate embedding from text
    Input -> text
    Output -> embedding
*/
export async function generateEmbedding(text: string) {
    const response = await huggingfaceClient.featureExtraction({
        model: 'sentence-transformers/paraphrase-multilingual-mpnet-base-v2',
        inputs: text
    })
    const flattened = Array.isArray(response[0]) ? (response as number[][]).flat() : (response as number[]);
    return flattened;
}

/*
    Description -> Generate text response from prompt
    Input -> prompt
    Output -> text response
*/
export async function generateTextResponse(prompt: string) {
    const response = await huggingfaceClient.textGeneration({
        model: 'meta-llama/Llama-3.2-3B-Instruct',
        inputs: prompt
    })
    return response.generated_text;
}

/*
    Description -> Generate image response from prompt
    Input -> prompt
    Output -> image response
*/

export async function generateImageResponse(prompt: string) {
    const response = await huggingfaceClient.textToImage({
        model: 'black-forest-labs/FLUX.1-schnell',
        inputs: prompt
    })
    const arrayBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');

    return base64String;
}/*
    Input -> Text Completion prompt
    Output -> Send a request to ml transformer model to perform autocompletion task
    Description -> Creating a data stream for autocomplete and sending it one by one
*/

export async function generateTextCompletion(prompt: string) {
    const stream = new ReadableStream({
        async start(controller) {
            try {
                const textstream = huggingfaceClient.chatCompletionStream({
                    model: "microsoft/Phi-3-mini-4k-instruct",
                    //"Qwen/QwQ-32B-Preview",
                    messages: [
                        {
                            role: "user",
                            content: "I am writing a piece of text in a note editor application. Please help me complete my chain of throught. This is what I have written:- " + prompt + " Please keep the tone consistent with the rest of the text and keep the response within 90 words and with complete sentences. Start your reponse as I have and proceed from there. Please do not repeat my prompt in response and add a space character at the start."
                        }
                    ],
                    stream: true
                });

                function delay(ms: number) {
                    return new Promise((resolve) => setTimeout(resolve, ms));
                }


                for await (const chunk of textstream) {
                    if (chunk.choices && chunk.choices.length > 0) {
                        const newContent = chunk.choices[0].delta.content;
                        controller.enqueue(new TextEncoder().encode(newContent));
                        await delay(100);
                    }
                }
                controller.close();
            }
            catch (error) {
                console.error("Error in streaming:", error);
                controller.error(new Error("Streaming failed."));
            }
        }

    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        }
    });
}
