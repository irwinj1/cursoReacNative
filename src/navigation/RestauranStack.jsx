import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenName } from '../utils';
import AddRestauranScreen from '../screens/restaurant/AddRestauranScreen';
import RestaurantScreen from '../screens/restaurant/RestaurantScreen';

const stack = createNativeStackNavigator();

export function RestauranStack(){
    return (
        <stack.Navigator  screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {fontSize: 20, fontWeight: 'bold'}}}>
            <stack.Screen name={screenName.restaurant.restaurant} component={RestaurantScreen} options={{title: 'Restaurantes'}} />
            <stack.Screen name={screenName.restaurant.addRestaurarnt} component={AddRestauranScreen} options={{title: 'Agregar restaurantes'}} />

        </stack.Navigator>
    );
}