import { View } from 'react-native'
import React from 'react'
import { styles } from './RegisterScreenStyle'
import { Image } from '@rneui/base'
import { RegisterForm } from '../../../components/Auth'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={require('../../../../assets/img/logo.png')} style={styles.logo} />
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  )
}