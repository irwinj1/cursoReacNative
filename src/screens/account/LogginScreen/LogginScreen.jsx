import { View,ScrollView } from 'react-native'
import { Text, Input,Image } from '@rneui/base'
import React from 'react'
import { styles } from './LoginScreenStyle'
import { useNavigation } from '@react-navigation/native'
import {screenName} from '../../../utils'
import { LoginForm } from '../../../components/Auth/LoginForm' 

export function LogginScreen() {

  const navigator = useNavigation();
  const goToRegister = () => {
    // Navigate to Register screen
    navigator.navigate(screenName.accounts.register)
  }
  return (
    <ScrollView>
      <Image source={require('../../../../assets/img/logo.png')} style={styles.logo} />
    
        <LoginForm />
      <Text onPress={goToRegister}  style={styles.register}>Registrarse</Text>
    </ScrollView>
  )
}