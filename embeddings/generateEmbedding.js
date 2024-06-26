import { pipeline, env, mean } from '@xenova/transformers'

env.useBrowserCache = false;

const pipe = await pipeline("feature-extraction", "Supabase/gte-small");

export const generateEmbedding = async (text) => {
    const output = await pipe(text, {
        pooling: 'mean',
        normalize: true
    });
    return Array.from(output.data);
}

// console.log(await generateEmbedding("Hello World"));