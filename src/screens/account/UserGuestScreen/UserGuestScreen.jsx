import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Image,Button } from '@rneui/base'
import { styles } from './UserGuestStyle'
import { useNavigation } from '@react-navigation/native'
import { screenName } from '../../../utils'

export function UserGuestScreen() {
  const navigator = useNavigation();
  const goToLogin = () => {
    // Navigate to Login screen
    navigator.navigate(screenName.accounts.login);
    console.log('login');
    
  }


  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image source={require('../../../../assets/user-guest.png')} alt="UserGuesr" style={styles.image} />
      <Text style={styles.title}>Consulta de perfil</Text>
      <Text style={styles.description}>
        ¿Como describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado más y comenta como ha sido tu experiencia.
      </Text>

    
        <Button title="Ver tu perfil" onPress={goToLogin} buttonStyle={styles.btnStyle} />
      
    
    </ScrollView>
  )
}