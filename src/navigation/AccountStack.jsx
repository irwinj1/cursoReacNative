import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenName } from "../utils";
import AccountScreen from "../screens/account/AccountScreen";
import {LogginScreen} from "../screens/account/LogginScreen";
import { RegisterScreen } from "../screens/account/RegisterScreen";


const stack = createNativeStackNavigator();

export function AccountStack(){
    return (
        <stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {fontSize: 20, fontWeight: 'bold'}}}>
            <stack.Screen name={screenName.accounts.accounts} component={AccountScreen} options={{title:"Cuenta"}} />
            <stack.Screen name={screenName.accounts.login} component={LogginScreen} options={{title:"Iniciar sesión"}} />
            <stack.Screen name={screenName.accounts.register} component={RegisterScreen} options={{title:"Registrarse"}} />

        </stack.Navigator>
    )
}