import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

export const options = {
  title: 'Episodio',
};

export default function EpisodeScreen() {
  const params = useLocalSearchParams();
  const episodeId = params.idep ?? params.id;
  const [ep, setEp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then(res => res.json())
      .then(json => {
        setEp(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [episodeId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!ep) {
    return <ThemedText>Error al cargar episodio</ThemedText>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.name}>
        {ep.name}
      </ThemedText>
      <ThemedText>Código: {ep.episode}</ThemedText>
      <ThemedText>Fecha: {ep.air_date}</ThemedText>
      <ThemedText style={styles.label}>Personajes:</ThemedText>
      {Array.isArray(ep.characters) &&
        ep.characters.map((charUrl: string) => {
          const cid = charUrl.split('/').pop();
          return (
            <ThemedText key={charUrl}>
              Personaje {cid}
            </ThemedText>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    marginBottom: 12,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
  },
});