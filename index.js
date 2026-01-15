import { View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const response = await fetch('https://appexpo-3.onrender.com/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTodo = async () => {
    try {
      const response = await fetch('https://appexpo-3.onrender.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          completed: false
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar");
      }

      const data = await response.json();
      Alert.alert('Guardado', `Todo ID: ${data.id}`);
      setTitle('');
      loadTodos(); // refresca la lista
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style>
      <TextInput
        placeholder="Nuevo TODO"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10
        }}
      />

      <Button title="Mostrar" onPress={loadTodos} />
      <Button title="Guardar" onPress={saveTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 10 }}>
            {item.id} - {item.title}
          </Text>
        )}
      />
    </View>
  );
}
