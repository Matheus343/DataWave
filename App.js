import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Calculos from './Calculos/Index';
import Criadores from './Criadores/Index';
import EntradaNoDominioDoTempo from './EntradaNoDominioDoTempo/Index';
import ImpulsoNoDominioDoTempo from './ImpulsoNoDominioDoTempo/Index';
import EspectroDoSinalDeEntrada from './EspectroDoSinalDeEntrada/Index';
import RespostaEmFreqDoCanalDeComunicacoes from './RespostaEmFreqDoCanalDeComunicacoes/Index';
import SaidaNoDominioDoTempo from './SaidaNoDominioDoTempo/Index';
import EspectroDoSinalDeSaida from './EspectroDoSinalDeSaida/Index';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Calculos" component={Calculos} options={{ title: 'Área de Cálculos' }} />
        <Stack.Screen name="Criadores" component={Criadores} options={{ title: 'Criadores' }} />
        <Stack.Screen name="EntradaNoDominioDoTempo" component={EntradaNoDominioDoTempo} options={{ title: 'Entrada No Dominio Do Tempo' }} />
        <Stack.Screen name="EspectroDoSinalDeEntrada" component={EspectroDoSinalDeEntrada} options={{ title: 'Espectro Do Sinal De Entrada' }} />
        <Stack.Screen name="ImpulsoNoDominioDoTempo" component={ImpulsoNoDominioDoTempo} options={{ title: 'Gráfico da resposta ao impulso do canal no domínio do tempo' }} />
        <Stack.Screen name="RespostaEmFreqDoCanalDeComunicacoes" component={RespostaEmFreqDoCanalDeComunicacoes} options={{ title: 'Resposta Em Frequencia Do Canal De Comunicacoes' }} />
        <Stack.Screen name="SaidaNoDominioDoTempo" component={SaidaNoDominioDoTempo} options={{ title: 'Saida No Dominio Do Tempo' }} />
        <Stack.Screen name="EspectroDoSinalDeSaida" component={EspectroDoSinalDeSaida} options={{ title: 'Espectro Do Sinal De Saida' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
