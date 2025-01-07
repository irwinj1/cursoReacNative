import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from '@rneui/themed';
import { Button } from '@rneui/base';
import { screenName } from '../../utils';
export default function RestaurantScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Text>Restaurant Screen</Text>

    {/* Botón FAB */}
    <FAB
      color="#00a680"
      size="large"
      icon={{ name: "add", color: "white" }}
      onPress={() => navigation.navigate(screenName.restaurant.addRestaurarnt)}
      style={styles.fab}
    />
  </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1, // Asegura que el View ocupe toda la pantalla
    justifyContent: "flex-start", // Posiciona el contenido al inicio
    backgroundColor: "#fff", // Agrega un color de fondo si es necesario
  },
  fab: {
    position: "absolute",
    bottom: 20, // Espacio desde la parte inferior
    right: 20, // Espacio desde el lado derecho
  },
});