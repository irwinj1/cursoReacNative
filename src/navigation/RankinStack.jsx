import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RankingScreen from "../screens/ranking/RankingScreen";
import { screenName } from "../utils";

const stack = createNativeStackNavigator();

export function RankinStack(){
    return (
        <stack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle: {fontSize: 20, fontWeight: 'bold'}}}>
            <stack.Screen name={screenName.ranking.ranking} component={RankingScreen} options={{title:"Ranking"}}/>
        </stack.Navigator>
    )
}