import { View, Text } from 'react-native'
import React from 'react'
import { Button, Input } from '@rneui/themed'
import { styles } from './EditUserEmailStyle'

export  function EditUserEmail({userInfo}) {
   const handleEmailChange = async()=>{
     // update email
     
   }
    
  return (
    <View>
      <Input value={userInfo} />
      <Button onPress={handleEmailChange} buttonStyle={styles.btnstyle} titleStyle={{ color: '#00a680', marginHorizontal: 20 }} containerStyle={styles.btnContainer} title='Actualizar' type='outline' />
    </View>
  )
}
