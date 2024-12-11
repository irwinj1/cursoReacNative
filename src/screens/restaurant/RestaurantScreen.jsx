import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { FAB } from '@rneui/themed';
import { Button } from '@rneui/base';
import { screenName } from '../../utils';
export default function RestaurantScreen({navigation}) {
  return (
    <View>
      <Text>Restaurant Screen</Text>
      {/* <Button title='Agregar' onPress={()=>navigation.navigate(screenName.restaurant.addRestaurarnt)} /> */}
        <FAB
        style={{ position: 'fixed', bottom: '10%' }}
           color='#00a680'
            size='medium'
            icon={{ name: 'add', color: 'white' }}
            onPress={() => navigation.navigate(screenName.restaurant.addRestaurarnt)}
            placement='right'
        />
    </View>
  )
}

const styles = StyleSheet.create({
  boton:{
    backgroundColor: 'green',
   
  }
});