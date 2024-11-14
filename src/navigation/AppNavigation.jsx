import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed';
import {screenName} from '../utils'
import { RestauranStack } from './RestauranStack';
import { FavoriteStack } from './FavoriteStack';
import { RankinStack } from './RankinStack';
import { SearchStack } from './SearchStack';
import { AccountStack } from './AccountStack';

const Tab = createBottomTabNavigator();

export default function AppNavigation(){
    return (
        <Tab.Navigator screenOptions={({route})=>({
            headerShown:false,
            tabBarActiveTintColor:"#00a680",
            tabBarInactiveTintColor:"#cccccc",
            tabBarIcon: ({color,size})=>TabIconOptions(route,color,size)
        })}>
            <Tab.Screen name={screenName.restaurant.tab} component={RestauranStack} options={{title:"Restaurantes"}} />
            <Tab.Screen name={screenName.favorites.tab} component={FavoriteStack} options={{title:"Favoritos"}}/>
            <Tab.Screen name={screenName.ranking.tab} component={RankinStack} options={{title:"Ranking"}}/>
            <Tab.Screen name={screenName.search.tab} component={SearchStack} options={{title:"Buscar"}}/>
            <Tab.Screen name={screenName.accounts.tab} component={AccountStack} options={{title:"Cuenta"}}/>
        </Tab.Navigator>
    )
}


function TabIconOptions(router,color,size){
    let iconName;


    if (router?.name === screenName.restaurant.tab) {
        iconName="compass-outline"
    }
    if (router?.name === screenName.favorites.tab) {
        iconName="heart-outline"
    }
    if (router?.name === screenName.ranking.tab) {
        iconName="star-outline"
    }
    if (router?.name === screenName.search.tab) {
        iconName="magnify"
    }
    if (router?.name === screenName.accounts.tab) {
        iconName="account-outline"
    }

    return <Icon type='material-community' name={iconName} size={size} color={color} />
}