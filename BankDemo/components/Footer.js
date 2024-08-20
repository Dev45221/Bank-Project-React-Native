import React, { useContext, useEffect } from "react";
import { View, Text } from 'react-native'
// import SettingsScreen from "../screens/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons  from "react-native-vector-icons/Ionicons";
import { colors } from "../config/theme";
// import CartScreen from "../screens/CartScreen";
// import HomeScreen from "../screens/HomeScreen";
import HomeScreens from "../screens/HomeScreen";
import axios from "axios";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, route })=> {

  useEffect(()=> {
    // getData()
    console.log(`Home ID: ${route.id}`)
  })

  const getData = async ()=> {
    try {
    } catch (error) {
      alert(error)
    }
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
      <Text>Home Screen</Text>
    </View>
  )
}

export const Footer = ()=> {
  // const { theme, updateTheme } = useContext(ThemeContext);
  // let colors.light = colors[theme.mode];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.light.secondary,
        },
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: colors.light.accent,
        tabBarInactiveTintColor: colors.light.tertiary,
        tabBarStyle: {
          backgroundColor: colors.light.secondary,
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          paddingLeft: 10,
          fontSize: 24,
        },
        headerStyle: {
          backgroundColor: colors.light.secondary,
        },
        headerTintColor: colors.light.tint,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={HomeScreen} />
      <Tab.Screen name="Settings" component={HomeScreen} />
    </Tab.Navigator>
  );
}