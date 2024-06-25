import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import MovieItem from '../components/MovieItem';

export default function App() {

  const [movies, setMovies] = useState<{}[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      let { data: movies, error } = await supabase.from('movies').select('*').range(0, 25);
      if (movies) setMovies(movies);
    }
    fetchMovies();
  }, []);


  return (
    <View style={styles.container}>

      <SafeAreaView >
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
});
