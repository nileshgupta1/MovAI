import { supabase } from './supabase.js';
import { generateEmbedding } from './generateEmbedding.js';

const getMovies = () => {
    return supabase.from('movies').select('*').is('embedding', null);
    // To make all entries null
    // return supabase.from('movies').select('*').not('embedding', 'is', null);
}

const addMovieEmbedding = async (movie) => {
    const embedding = await generateEmbedding(`${movie.title}: ${movie.overview}`);
    // console.log(embedding);
    await supabase.from('movies').update({ embedding }).eq('id', movie.id);
    // To insert null values
    // await supabase.from('movies').update({ embedding: null }).eq('id', movie.id);
}

const processAllMovies = async () => {
    const { data: movies } = await getMovies();
    console.log(movies.length);

    if (!movies?.length) {
        return;
    }
    await Promise.all(movies.map((movie) => addMovieEmbedding(movie)));
    processAllMovies();
}

processAllMovies();