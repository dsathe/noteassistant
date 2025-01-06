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
}