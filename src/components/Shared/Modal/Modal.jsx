import { View, Text } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/base';
import { styles } from './ModalStyle'

export  function Modal(props) {
    const {show,close,children} = props;
  return (
   <Overlay isVisible={show} overlayStyle={styles.overlay} onBackdropPress={close}>
     {children}
   </Overlay>
  )
}