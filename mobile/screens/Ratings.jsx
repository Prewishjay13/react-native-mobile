import {useContext, useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import {ContentContext} from "../providers/ContentProvider.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleContext, useStyle} from "../providers/StyleProvider.jsx";

export default function Ratings({navigation}) {
    const [starRatings, setStarRatings] = useState(null);
    const ratingOptions = [1, 2, 3, 4, 5];
    const {styleSheet} = useStyle();

    useEffect(() => {
        navigation.addListener('focus', () => {
            getStoredRatings();
        })
    }, []);
    const hotspots = useContext(ContentContext);

    const getStoredRatings = async () => {
        try {
            //hall alle keys op met AsyncStorage.getAllKeys().
            const keys = await AsyncStorage.getAllKeys();
            //gebruik de keys om alle opgeslagen ratings op te vragen.
            const storedRatings = await AsyncStorage.multiGet(keys);
            //array bevat['key', 'value']. Value moet worden geparsed.
            const parsedRatings = storedRatings.map((keyValue) => {
                return {
                    venue: keyValue[0],
                    rating: JSON.parse(keyValue[1]),
                }
            })
            setStarRatings(parsedRatings);
        } catch (e) {
            console.error(e);
        }
    }
    const findLatLong = (key) => {
        let latLong
        //for each loop om door de hotspots heen te loopen
        hotspots.forEach((hotspot) => {
            //use find to loop through venues.
            const FOUND = hotspot.venues.find((venue) => {
                if (venue.venue === key) {
                    return true
                }
            });
            //pak de locatie als de restaurant gevonden is
            if (FOUND !== undefined) {
                latLong = FOUND.latLong;
            }
        });

        return latLong ? latLong : null;
    }
    return (
        <View style={styleSheet.container}>
            <FlatList data={starRatings}
                      renderItem={({item}) =>
                          <View style={styleSheet.item}>
                              <Text
                                  onPress={() => {
                                      navigation.navigate("List", {screen: "Detail"})
                                  }}
                                  onLongPress={() => {
                                      navigation.navigate("Map", {screen: "MapScreen", params: findLatLong(item.venue)})
                                  }}
                                  style={styleSheet.itemText}
                              >{item.venue}</Text>
                              <View style={styleSheet.smallStarContainer}>
                                  {ratingOptions.map((option) => (
                                      <Ionicons
                                          name={option <= item.rating ? "ios-star" : "star-outline"}
                                          style={option <= item.rating ? styleSheet.starSelected : styleSheet.starUnselected}
                                          size={32}
                                          key={option}
                                      />
                                  ))}
                              </View>
                          </View>
                      }
            />
        </View>
    )
}