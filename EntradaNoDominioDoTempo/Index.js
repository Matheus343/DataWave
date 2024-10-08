import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

export default function GraficoSinalEntrada({ navigation }) {
  const handleExibir = () => {
    Alert.alert('EM OBRAS', 'RETORNE NO FINAL DO SEMESTRE');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Gráfico do sinal de entrada no domínio do tempo</Text>

      <Image source={require('../assets/grafico2.png')} style={styles.imageGrafico} />

      <Text style={styles.instruction}>Valores utilizados para construção do gráfico</Text>

      <TouchableOpacity style={styles.button} onPress={handleExibir}>
        <Text style={styles.buttonText}>Exibir</Text>
      </TouchableOpacity>

      <Image source={require('../assets/tabela_entrada_tempo.png')} style={styles.imageTabela} />

      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.footerButtonText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Calculos')}>
          <Text style={styles.footerButtonText}>Cálculo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  voltar: {
    fontSize: 30,
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageGrafico: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#A9A9F5',
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  imageTabela: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footerButton: {
    backgroundColor: '#A9A9F5',
    padding: 10,
    borderRadius: 25,
    width: '40%',
  },
  footerButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
