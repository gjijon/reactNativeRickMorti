import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export const options = { title: 'Detalle' };

export default function DetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  React.useEffect(() => { navigation.setOptions({ title: 'Detalle' }); }, [navigation]);
  const { id } = useLocalSearchParams();
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(json => { setChar(json); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={detailStyles.loader} size="large" />;
  if (!char) return <ThemedText>Error al cargar personaje</ThemedText>;

  return (
    <ScrollView contentContainerStyle={detailStyles.container}>
      <Image source={{ uri: char.image }} style={detailStyles.image} />
      <ThemedText type="title" style={detailStyles.name}>{char.name}</ThemedText>
      <ThemedText>Estado: {char.status}</ThemedText>
      <ThemedText>Especie: {char.species}</ThemedText>
      <ThemedText>Género: {char.gender}</ThemedText>
      <ThemedText>Origen: {char.origin.name}</ThemedText>
      <ThemedText>Ubicación: {char.location.name}</ThemedText>
      <ThemedText style={detailStyles.label}>Episodios:</ThemedText>
      {char.episode.map(ep => {
        const epId = ep.split('/').pop();
        return (
          <TouchableOpacity key={ep} onPress={() => router.push(`/episode/${epId}`)}>
            <ThemedText>Ep {epId}</ThemedText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const detailStyles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  name: {
    marginBottom: 8,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
  },
});
