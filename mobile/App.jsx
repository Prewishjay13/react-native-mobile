//import libraries voor het maken en instellen van navigatie op de app
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

//import alle paginas waar er naar navigeert gaat worden zodat het naar de componenten geroute kan worden
import Map from "./screens/Map.jsx"
import List from "./screens/Lists.jsx"
import Settings from "./screens/Settings.jsx";
import {ContentProvider} from "./providers/ContentProvider.jsx";
import Ratings from "./screens/Ratings.jsx";
import {StyleProvider, useStyle} from "./providers/StyleProvider.jsx";


export default function App() {

    const Tab = createBottomTabNavigator();

    return (
        //wrapp alles in de contentprovidertag zodat het applicatie alle data ophaalt en meegeeft aan de map en de styling erover heen geplaatst wordt
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
