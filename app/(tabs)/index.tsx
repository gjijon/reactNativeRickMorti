import { HelloWave } from '@/components/HelloWave';
import Logo from '@/components/Logo';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(res => res.json())
      .then(json => { setData(json.results); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/detail/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.info}>
        <ThemedText type="title" style={styles.name}>{item.name}</ThemedText>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: item.status === 'Alive' ? '#4caf50' : '#f44336' }]} />
          <ThemedText type="default">{`${item.status} — ${item.species}`}</ThemedText>
        </View>
        <ThemedText type="default" style={styles.label}>Última ubicación:</ThemedText>
        <ThemedText type="default" style={styles.text}>{item.location.name}</ThemedText>
        <ThemedText type="default" style={styles.label}>Primera aparición:</ThemedText>
        <ThemedText type="default" style={styles.text}>{item.episode[0].split('/').pop()}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Logo style={styles.logo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hola!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.subtitleContainer}>
        <ThemedText type="subtitle">Personajes Rick and Morty</ThemedText>
      </ThemedView>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 290,
    height: 178,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  subtitleContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  loader: {
    marginTop: 20,
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2c2f33',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
  },
  name: {
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  label: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  text: {
    fontSize: 14,
    color: '#ddd',
  },
});
