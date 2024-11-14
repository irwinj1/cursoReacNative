import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import { screenName } from "../utils";

const stack = createNativeStackNavigator();

export function FavoriteStack() {
    return (
        <stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {fontSize: 20, fontWeight: 'bold'}}}>
            <stack.Screen name={screenName.favorites.favorites} component={FavoritesScreen} options={{title: 'Favoritos'}} />
        </stack.Navigator>
    );
}