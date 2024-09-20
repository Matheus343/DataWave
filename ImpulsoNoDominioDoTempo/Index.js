import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

export default function ImpulsoNoDominioDoTempo({ navigation }) {
  const handleCalcular = () => {
    Alert.alert('EM OBRAS', 'RETORNE NO FINAL DO SEMESTRE');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}

      <Text style={styles.title}>Gráfico da resposta ao impulso do canal no domínio do tempo</Text>

      {/* Instrução para o usuário */}
      <Text style={styles.instruction}>*Preencha a tabela:</Text>

      {/* Imagem da tabela */}
      <Image source={require('../assets/tabela_ampli_tempo.jpg')} style={styles.imageTabela} />

      {/* Botão Calcular */}
      <TouchableOpacity style={styles.button} onPress={handleCalcular}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {/* Imagem do gráfico */}
      <Image source={require('../assets/grafico1.jpg')} style={styles.imageGrafico} />

      {/* Botão Início */}
      <TouchableOpacity style={styles.inicioButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.inicioText}>Início</Text>
      </TouchableOpacity>
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
  instruction: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  imageTabela: {
    width: '100%',
    height: 150,  // Ajuste o tamanho da imagem conforme necessário
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A9A9F5',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 40,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  imageGrafico: {
    width: '100%',
    height: 200,  // Ajuste o tamanho da imagem conforme necessário
    resizeMode: 'contain',
    backgroundColor: '#D3D3D3',
    marginBottom: 20,
  },
  inicioButton: {
    backgroundColor: '#A9A9F5',
    padding: 8,
    borderRadius: 20,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  inicioText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
