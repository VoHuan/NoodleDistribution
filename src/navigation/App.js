import React from "react";
import  Welcome  from '../screens/Welcome'
import QRScreen from '../screens/QRScreen'
import Home  from '../screens/Home'
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

        </Stack.Navigator>
    </NavigationContainer>
}
export default App