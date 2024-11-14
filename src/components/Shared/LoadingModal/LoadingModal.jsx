import { View, ActivityIndicator } from 'react-native'
import { Overlay,Text } from '@rneui/base'
import React from 'react'
import { styles } from './LoadingModalStyle'

export function LoadingModal(props) {
    const {isShow,text} = props;
  return (
    <Overlay isVisible={isShow} windowBackGroundColor="rgba(0,0,0,0.5"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlay}
    >
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00a680" />
          {text&&<Text style={styles.text}>{text}</Text>}
        </View>
  
    </Overlay>
  )
}

