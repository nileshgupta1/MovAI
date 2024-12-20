import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import MovieItem from '../components/MovieItem';

export default function App() {

  const [movies, setMovies] = useState<{}[]>([]);
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      let { data: movies, error } = await supabase.from('movies').select('*').range(0, 100);
      if (movies) setMovies(movies);
    }
    fetchMovies();
  }, []);

  const onPress = async () => {
    // const {data} =  await supabase.functions.invoke('embed', {body: {input: query}});
    // const { data:movies } = await supabase.rpc('match_movies', {
    //   query_embedding: data.embedding,
    //   match_threshold: 0.78,
    //   match_count: 20
    // });
    // setMovies(movies);
    const { data: movies } = await supabase.from('movies').select('*').textSearch('title', query);
    if (movies?.length)
      setMovies(movies);
    setQuery('');
  }


  return (
    <View style={styles.container}>

      <SafeAreaView >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="AI: Search for movies"
            placeholderTextColor={'gray'}
            style={styles.input}
            value={query}
            onChangeText={setQuery}
          />
          <Button title='Search' onPress={onPress} />
        </View>
        <FlatList data={movies} renderItem={MovieItem} />
      </SafeAreaView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181413',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    color: 'gainsboro'
  }
});
