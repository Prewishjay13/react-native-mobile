import React, {createContext, useContext, useState} from "react";
import {StyleSheet} from "react-native";

const StyleContext = createContext();
const StyleToggleContext = createContext();

export function useStyle() {
    return useContext(StyleContext);
}

export function useToggleStyle() {
    return useContext(StyleToggleContext);
}

export function StyleProvider({children}) {
    const [theme, setTheme] = useState(true);

    function toggleStyle() {
        setTheme(!theme);
    }

    return (
        <StyleContext.Provider value={theme ? lightTheme : darkTheme}>
            <StyleToggleContext.Provider value={toggleStyle}>
                {children}
            </StyleToggleContext.Provider>
        </StyleContext.Provider>
    )
}
const lightTheme = {
    styleSheet: StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
      },
      sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#FF6F61',
      },
      item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF1CC',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
      },
      itemText: {
        fontSize: 18,
      },
      bigStarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFF1CC',
      },
      smallStarContainer: {
        display: 'flex',
        flexDirection: 'row',
      },
      starUnselected: {
        color: '#FF6F61',
      },
      starSelected: {
        color: '#FFB300',
      },
      navHeader: {
        backgroundColor: '#FFB300',
      },
    }),
    navStyle: {
      headerStyle: { backgroundColor: '#FFB300' },
      headerTintColor: '#1B1A17',
      barStyle: { backgroundColor: '#FFB300' },
      activeColor: '#1B1A17',
      inactiveColor: '#FF6F61',
    },
  };
  
  const darkTheme = {
    styleSheet: StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
      },
      sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: '#1E1E1E',
        color: '#FFB300',
      },
      item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FF6F61',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
      },
      itemText: {
        fontSize: 18,
      },
      bigStarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FF6F61',
      },
      smallStarContainer: {
        display: 'flex',
        flexDirection: 'row',
      },
      starUnselected: {
        color: '#1E1E1E',
      },
      starSelected: {
        color: '#FFB300',
      },
      navHeader: {
        backgroundColor: '#FFB300',
      },
    }),
    navStyle: {
      headerStyle: { backgroundColor: '#1E1E1E' },
      headerTintColor: '#FFB300',
      barStyle: { backgroundColor: '#1E1E1E' },
      activeColor: '#FFB300',
      inactiveColor: '#FF6F61',
    },
  };
  