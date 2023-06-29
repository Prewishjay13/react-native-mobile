import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Map from "./screens/Map.jsx"
import List from "./screens/Lists.jsx"
import Settings from "./screens/Settings.jsx";
import {ContentProvider} from "./providers/ContentProvider.jsx";
import Ratings from "./screens/Ratings.jsx";
import {StyleProvider, useStyle} from "./providers/StyleProvider.jsx";
import {useEffect} from "react";

export default function App() {
  return (
    <ContentProvider>
    <StyleProvider>
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Map"
                           screenOptions={() => {
                               const {navStyle} = useStyle();
                               return {
                                   headerStyle: navStyle.headerStyle,
                                   headerTintColor: navStyle.headerTintColor,
                                   tabBarStyle: navStyle.barStyle,
                                   tabBarActiveTintColor: navStyle.activeColor,
                                   tabBarInactiveTintColor: navStyle.inactiveColor,
                               }
                           }}
            >
                <Tab.Screen name="Map" component={Map} options={{headerShown: false}}/>
                <Tab.Screen name="List" component={List} options={{headerShown: false}}/>
                <Tab.Screen name="Ratings" component={Ratings}/>
                <Tab.Screen name="Settings" component={Settings}/>
            </Tab.Navigator>
        </NavigationContainer>
    </StyleProvider>
</ContentProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});