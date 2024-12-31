import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.HUGGINGFACE_TOKEN);

// /api/completion
/*
    Input -> POST request with prompt in the body
    Output -> Send a request to ml transformer model to perform autocompletion task
    Description -> Creating a data stream for autocomplete and sending it one by one
*/

export async function POST(req: Request) {

    const { prompt } = await req.json();

    const stream = new ReadableStream({
        async start(controller) {
            try {
                const textstream = client.chatCompletionStream({
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