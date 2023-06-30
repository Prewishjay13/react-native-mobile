import React, {createContext, useEffect, useState} from "react";
import {Text} from "react-native";

export const ContentContext = createContext();

export function ContentProvider({children}) {
    const [content, setContent] = useState({});
    useEffect(() => {
        fetchContent()
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch("https://prewishjay13.github.io/hotspot.json/hotspots.json");
            const hotspots = await res.json();
            setContent(hotspots);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ContentContext.Provider value={content}>
            {/*Check if content has been fetched before mounting child components
            otherwise an undefined error will occur.*/}
            {Object.keys(content).length > 0 ? children : <Text>Loading</Text>}
        </ContentContext.Provider>
    )
}
