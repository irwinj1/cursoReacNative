import { View, Text } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed'

export function EditUserName({userInfo}) {
    console.log(userInfo);
    
  return (
    <View>
      <Input value={userInfo?.first_name} label="Primer nombre" />
    </View>
  )
}