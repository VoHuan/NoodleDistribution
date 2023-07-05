import React from "react";
import  Welcome  from '../screens/Welcome'
import QRScreen from '../screens/QRScreen'
import Home  from '../screens/Home'
import Done  from '../screens/Done'
import OutOfNoodle from '../screens/OutOfNoodle'
import Error from '../screens/Error'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

function App(props) {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Welcome"} component={Welcome} />
            <Stack.Screen name={"QRScreen"} component={QRScreen} />
            <Stack.Screen name={"Home"} component={Home} />
            <Stack.Screen name={"Done"} component={Done} />
            <Stack.Screen name={"OutOfNoodle"} component={OutOfNoodle} />
            <Stack.Screen name={"Error"} component={Error} />


        </Stack.Navigator>
    </NavigationContainer>
}
export default App