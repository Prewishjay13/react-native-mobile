import {SectionList, Text, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@expo/vector-icons/Ionicons';
import {useStyle} from "../providers/StyleProvider.jsx";

export default function Detail({route, navigation}) {
    const [starRating, setStarRating] = useState(null);
    const ratingOptions = [1, 2, 3, 4, 5];
    const restaurant = route.params;
    const {styleSheet} = useStyle();

    useEffect(() => {
        navigation.setOptions({title: restaurant.restaurant});
        getRating();
    }, []);

    //maak een array met de titels en data voor een sectie dat weergegeven zal worden
    const getList = () => {
        const menuList = [];

        //menuList bestaat uit categories
        //haal alle keys op van de categories in restaurant.menuList.
        const categories = Object.keys(restaurant.menuList);

        categories.forEach((key) => {
            //gebruik de opgehaalde keys als titels voor de section
            menuList.push({title: key, data: restaurant.menuList[key]});
        });

        return menuList;
    }

    const setRating = async (newRating) => {
        const json = JSON.stringify(newRating);
        try {
            await AsyncStorage.setItem(restaurant.restaurant, json);
            setStarRating(newRating);
        } catch (e) {
            console.error(e);
        }
    }
    const getRating = async () => {
        try {
            const json = await AsyncStorage.getItem(restaurant.restaurant);
            setStarRating(json != null ? JSON.parse(json) : 0);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={styleSheet.container}>
            <View style={styleSheet.bigStarContainer}>
                {ratingOptions.map((option) => (
                    <Ionicons name={option <= starRating ? "ios-star" : "star-outline"}
                              onPress={() => setRating(option)}
                              style={option <= starRating ? styleSheet.starSelected : styleSheet.starUnselected}
                              key={option}
                              size={32}
                    />
                ))}
            </View>
            <SectionList
                sections={getList()}
                renderItem={({item}) => <Text style={styleSheet.item}>{item}</Text>}
                renderSectionHeader={({section}) => <Text style={styleSheet.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}