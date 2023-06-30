import {Dimensions, StyleSheet, View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useContext, useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Detail from "./Detail.jsx";
import {ContentContext} from "../providers/ContentProvider.jsx";
import {useStyle} from "../providers/StyleProvider.jsx";
import * as Location from "expo-location";


export default function Map({route}) {
    const MapStack = createNativeStackNavigator();
    const {navStyle} = useStyle();
    return (
        <MapStack.Navigator initialRouteName="MapScreen" screenOptions={{
            headerStyle: navStyle.headerStyle,
            headerTintColor: navStyle.headerTintColor
        }}>
            <MapStack.Screen name="MapScreen" component={MapScreen} options={{title: "Map"}}/>
            <MapStack.Screen name="Detail" component={Detail}/>
        </MapStack.Navigator>
    )
}

function MapScreen({route, navigation}) {
    const hotspots = useContext(ContentContext);

    //useEffect toestemming te vragen aan de gebruiker voor gebruik te maken van locatie en map
    useEffect(() => {
        requestPermission();
    }, []);

    //zet alle opgeslagen plekken in een array om op de map weer te geven
    const getVenues = () => {
        const restaurants = [];

        //loopt door alle hotspots heen
        hotspots.forEach((hotspot) => {
            //then loop through all restaurants
            hotspot.restaurants.forEach((restaurant) => {
                //push the restaurant into the restaurants array
                restaurants.push(restaurant);
            });
        });
        return restaurants
    }

    const requestPermission = async () => {
        await Location.requestForegroundPermissionsAsync();
    };

    const getLocation = async () => {
        const location = await Location.getCurrentPositionAsync({});
        navigation.setParams({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                     region={{
                         latitude: route.params ? route.params.latitude : 51.915925469994704,
                         longitude: route.params ? route.params.longitude : 4.477762127342756,
                         latitudeDelta: 0.005,
                         longitudeDelta: 0.005
                     }}
                     showsPointsOfInterest={false}
                //Hide POI for Android.
                     customMapStyle={hideAndroidPOI}
                     showsUserLocation={true}
            >
                {getVenues().map((restaurant, index) => {
                    return (
                        <Marker onCalloutPress={() => {
                            navigation.navigate("Detail", restaurant)
                        }}
                                key={index}
                                title={restaurant.restaurant}
                                coordinate={restaurant.latLong}
                        />
                    )
                })}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 1
    },
});

const hideAndroidPOI = [
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]
