import React from 'react';
import { View, StyleSheet } from 'react-native';
import TitleComponent from './componentes/TitleComponent.js';
import ImageComponent from './componentes/ImagemComponent.js';
import ButtonComponent from './componentes/ButtonComponent.js';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <TitleComponent />
      <ImageComponent />
      <ButtonComponent navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
