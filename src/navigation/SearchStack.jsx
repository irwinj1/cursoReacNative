import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearxhScreen from "../screens/search/SearxhScreen";
import { screenName } from "../utils";

const stack = createNativeStackNavigator();

export function SearchStack(){
    return (
        <stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {fontSize: 20, fontWeight: 'bold'}}}>
            <stack.Screen name={screenName.search.search} component={SearxhScreen} options={{title:"Buscar"}} />
        </stack.Navigator>
    )
}