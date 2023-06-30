import {useContext} from "react";
import {SectionList, Text, View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Detail from "./Detail.jsx";
import {ContentContext} from "../providers/ContentProvider.jsx";
import {useStyle} from "../providers/StyleProvider.jsx";


export default function List() {
    const ListStack = createNativeStackNavigator();
    const {navStyle} = useStyle();

    return (
        <ListStack.Navigator initialRouteName="ListScreen" screenOptions={{
            headerStyle: navStyle.headerStyle,
            headerTintColor: navStyle.headerTintColor
        }}>
            <ListStack.Screen name="ListScreen" component={ListScreen} options={{title: "List"}}/>
            <ListStack.Screen name="Detail" component={Detail}/>
        </ListStack.Navigator>
    )
}

function ListScreen({navigation}) {
    const hotspots = useContext(ContentContext);
    const {styleSheet} = useStyle();
    // returnt een array met objecten deze objecten hebben de titel en data voor een lijst
    const getList = () => {
        const hotspotList = []
        //loopt through alle hotspots in de api 
        hotspots.map((hotspot) => {
            //pusht de objecten met de titele en data in de hotspotList array.
            hotspotList.push({title: hotspot.label, data: hotspot.restaurants})
        });

        return hotspotList;
    }

    return (
        <View style={styleSheet.container}>
            <SectionList
                sections={getList()}
                renderItem={
                    ({item}) =>
                        <View style={styleSheet.item}>
                            <Text style={styleSheet.itemText}
                                  onPress={() => {
                                      navigation.navigate("Detail", item)
                                  }}

                                //We're in a nested navigator so need to get the parent navigator.
                                //Then from the parent navigator we must pass params to nested navigator in Map.
                                  onLongPress={() => {
                                      navigation.getParent().navigate("Map", {
                                          screen: "Map",
                                          params: item.latLong
                                      })
                                  }}
                            >
                                {item.restaurant}
                            </Text>
                        </View>}
                renderSectionHeader={({section}) => <Text style={styleSheet.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}