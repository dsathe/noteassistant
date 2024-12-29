import { HfInference } from '@huggingface/inference';
const apiKey = process.env.HUGGINGFACE_API_KEY;

if (!apiKey) {
    throw new Error('Missing Huggingface API key');
}

const huggingfaceClient = new HfInference(apiKey);

export async function generateEmbedding(text: string) {
    const response = await huggingfaceClient.featureExtraction({
        model: 'sentence-transformers/paraphrase-multilingual-mpnet-base-v2',
        inputs: text
    })
    const flattened = Array.isArray(response[0]) ? (response as number[][]).flat() : (response as number[]);
    return flattened;
}

