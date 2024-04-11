import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

function Header() {
  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: '#097280', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20 }}>Marcador de pontos do JIFENA</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: '#097280', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 30 }}>Footer - PDM1 Â© 2024 </Text>
    </View>
  );
}

export default function App() {
  const [text, setText] = useState('');
  const [nomeUm, setnomeUm] = useState('');
  const [nomeDois, setnomeDois] = useState('');
  const [botao1, setBotao1] = useState(true);
  const [botao2, setBotao2] = useState(true);
  const [nomeTime, setNomeTime] = useState('');
  const [nomeJogador, setNomeJogador] = useState('');
  const [numeroCamiseta, setNumeroCamiseta] = useState('');
  const [listadeJogadores, setListadeJogadores] = useState([]);
  const [placarUm, setPlacarUm] = useState(0);
  const [placarDois, setPlacarDois] = useState(0);

  function adicionarJogador() {
    const novoJogador = { nome: nomeJogador, numero: numeroCamiseta, nomeDoTime: nomeTime, pontos: 0 };
    setListadeJogadores([...listadeJogadores, novoJogador]);
    setNomeJogador('');
    setNumeroCamiseta('');
  }

  function AdcionaPonto(index) {
    const listaAtualizada = [...listadeJogadores];
    listaAtualizada[index].pontos++;
    setListadeJogadores(listaAtualizada);
    
    if (listaAtualizada[index].nomeDoTime === nomeUm) {
      setPlacarUm(placarUm + 1);
    } else {
      setPlacarDois(placarDois + 1);
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#03515f', justifyContent: 'center', padding: 5, alignItems: 'center' }}>
      <Header />
      <View style={{ flex: 6, backgroundColor: 'white', height: 500, width: '100%' }}>

        <Text style={styles.titulos}>Esporte:</Text>
        <TextInput style={{ borderWidth: 1 }} placeholder="digite seu nome" onChangeText={newText => setText(newText)} defaultValue={text} />

        <Text style={styles.titulos}>Nome do time 1:</Text>
        <TextInput style={{ borderWidth: 1 }} onChangeText={newText => setnomeUm(newText)} defaultValue={nomeUm} />

        <Text style={styles.titulos}>Nome do time 2:</Text>
        <TextInput style={{ borderWidth: 1 }} onChangeText={newText => setnomeDois(newText)} defaultValue={nomeDois} />

        <Text style={styles.titulos}>Placar - {text}</Text>

        <Text style={styles.placar}>{nomeUm}:, {placarUm} pontos</Text>
        <Text style={styles.placar}>{nomeDois}:, {placarDois} pontos</Text>

        <Button onPress={() => { setBotao1(false); setBotao2(true); setNomeTime(nomeUm) }} disabled={!botao1} title={botao1 ? nomeUm : "selecionado"} />
        <Button onPress={() => { setBotao2(false); setBotao1(true); setNomeTime(nomeDois) }} disabled={!botao2} title={botao2 ? nomeDois : "selecionado"} />

        <Text style={styles.titulos}>Cadastre um jogador</Text>
        <TextInput style={{ borderWidth: 1 }} placeholder="Nome do jogador" onChangeText={newText => setNomeJogador(newText)} value={nomeJogador} />
        <TextInput style={{ borderWidth: 1 }} placeholder="Número da camiseta" onChangeText={newText => setNumeroCamiseta(newText)} value={numeroCamiseta} />
        <Button onPress= {adicionarJogador} title="Cadastrar" />

        <Text style={styles.titulos}>Lista de jogadores</Text>

        <FlatList
          data={listadeJogadores}

          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>

              <Text style={styles.item}> {item.nome}, {item.nomeDoTime}, {item.numero} , {item.pontos}</Text>

              <TouchableOpacity onPress={() => AdcionaPonto(index)} style={styles.button}>
                <Text style={styles.buttonText}>+1 ponto</Text>
              </TouchableOpacity>
            </View>
          )}
        />

      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  item: {
    fontSize: 18,
  },

  button: {
    backgroundColor: '#03515f',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: 'white',
  },

  placar: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  titulos: {
    color: 'black',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
})
