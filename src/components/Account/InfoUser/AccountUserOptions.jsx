import React,{useState} from 'react';
import { View,ScrollView } from 'react-native'
import { ListItem,Icon,Text } from '@rneui/base'
import {map} from 'lodash';
import { Modal } from '../../Shared/Modal/Modal';
import { DisplayName } from '../EditUserAccount/DisplayName';

export function AccountUserOptions({getInfoUser}) {
  const [showModal, setShowModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null);

  const onCLoseModal = ()=> setShowModal((prevState)=>!prevState)
  const getInfoUserData = ()=>{
    getInfoUser();
    setShowModal(false);
  }
  const selectedComponent = (key)=>{
    if(key == 'displayName'){
      setShowModal(true);
      setRenderComponent(<DisplayName onCLose={onCLoseModal} getInfoUserData={getInfoUserData} />);
    }
    if (key == 'email') {
      setShowModal(true);
      setRenderComponent(<Text>Cambiar email</Text>);

    }
    if (key == 'password') {
      setShowModal(true);
      setRenderComponent(<Text>Cambiar contraseña</Text>);

    }
  }
  const menuOptions = getMenuOptions(selectedComponent);
  return (
    <View style={{width:"95%",margin:'auto'}}>
      {map(menuOptions, (menu, index) =>(
        <ListItem key={index}
          bottomDivider
          onPress={menu.onPress }
        >
          <Icon type={menu.iconType} name={menu.iconNameLeft} color={menu.iconColorLeft} />
          <ListItem.Content>
            <ListItem.Title>{menu.titile}</ListItem.Title>
          </ListItem.Content>
          <Icon type={menu.iconType} name={menu.iconNameRight} color={menu.iconColorRight} />
        </ListItem>
      ))}
      <ScrollView centerContent={true} style={{minHeight:"100%"}} >
        <Modal show={showModal} close={onCLoseModal}  >
          {renderComponent}
        </Modal>
      </ScrollView>
    </View>
  )
}

function getMenuOptions(selectedComponent){
  return [
    {
      titile:'Cambiar nombre y Apellidos',
      iconType:'material-community',
      iconNameLeft:'account-circle',
      iconColorLeft:'#ccc',
      iconNameRight:'chevron-right',
      iconColorRight:'#a6a6a6',
      onPress: ()=>selectedComponent('displayName')
      
    },
    {
      titile:'Cambiar Email',
      iconType:'material-community',
      iconNameLeft:'at',
      iconColorLeft:'#ccc',
      iconNameRight:'chevron-right',
      iconColorRight:'#ccc',
      onPress: ()=>selectedComponent('email')
    },
    {
      titile:'Cambiar contraseña',
      iconType:'material-community',
      iconNameLeft:'lock-reset',
      iconColorLeft:'#ccc',
      iconNameRight:'chevron-right',
      iconColorRight:'#ccc',
      onPress: ()=>selectedComponent('password')
    },
   
  ]
}