import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Importamos íconos de Ant Design de Expo Vector Icons
import { AntDesign } from '@expo/vector-icons';

export default function About() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.content}>
        {/* Título principal */}
        <Text style={styles.title}>Acerca de Rick y Morty App</Text>

        {/* Sección: Sobre la Serie */}
        <View style={styles.sectionHeader}>
          <AntDesign name="book" size={24} color="#444" />
          <Text style={styles.subtitle}>Sobre la Serie</Text>
        </View>
        <Text style={styles.text}>
          "Rick y Morty" es una serie animada para adultos creada por Dan Harmon y Justin Roiland para Adult Swim.
          Sigue las aventuras de Rick Sanchez, un científico excéntrico, y su nieto Morty Smith a través de universos paralelos y situaciones cómicas.
        </Text>

        {/* Sección: Sobre esta App */}
        <View style={styles.sectionHeader}>
          <AntDesign name="appstore-o" size={24} color="#444" />
          <Text style={styles.subtitle}>Sobre esta App</Text>
        </View>
        <Text style={styles.text}>
          Esta aplicación consume la API oficial de Rick y Morty para mostrar información detallada de personajes,
          episodios y ubicaciones. Construida con React Native, Expo Router y prácticas modernas de desarrollo móvil.
        </Text>

        {/* Sección: Tecnologías Utilizadas */}
        <View style={styles.sectionHeader}>
          <AntDesign name="tool" size={24} color="#444" />
          <Text style={styles.subtitle}>Tecnologías Utilizadas</Text>
        </View>
        {['React Native', 'Expo Router', 'Rick and Morty API', 'React Native SVG', 'Redux for React Native'].map((tech, idx) => (
          <View key={idx} style={styles.techList}>
            <AntDesign name="checkcircleo" size={20} color="#666" />
            <Text style={styles.tech}>{tech}</Text>
          </View>
        ))}

        {/* Sección: Contacto y Soporte */}
        <View style={styles.sectionHeader}>
          <AntDesign name="mail" size={24} color="#444" />
          <Text style={styles.subtitle}>Contacto y Soporte</Text>
        </View>
        <Text style={styles.text}>
          Para sugerencias, errores o consultas, escríbenos a:
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:soporte@rickymortyapp.com')}>
          <View style={styles.contactRow}>
            <AntDesign name="enviromento" size={20} color="#007aff" style={styles.techIcon} />
            <Text style={styles.contactEmail}>soporte@rickymortyapp.com</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 15,
    textAlign: 'justify',
  },
  techList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tech: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  techIcon: {
    marginRight: 8,
  },
  contactEmail: {
    fontSize: 16,
    color: '#007aff',
    textDecorationLine: 'underline',
  },
});
