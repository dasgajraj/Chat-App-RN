import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen.jsx';
import ProfileScreen from '../Screens/ProfileScreen.jsx';

const Stack = createStackNavigator();

export default StackNavigation= () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
    );
}