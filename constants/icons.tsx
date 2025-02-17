import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

const icons = {
    home: <Ionicons name="home-outline" size={24} color="black" />,
    settings: <Ionicons name="settings-outline" size={24} color="black" />,
    search: <MaterialIcons name="search" size={24} color="black" />,
    filter: <Ionicons name="filter-outline" size={24} color="black" />,
    sun: <FontAwesome5 name="sun" size={24} color="red" />,
    water: <FontAwesome5 name="water" size={24} color="blue" />,
    wind: <FontAwesome5 name="wind" size={24} color="green" />,
    temperature: <FontAwesome5 name="temperature-high" size={24} color="orange" />,
    pressure: <FontAwesome5 name="pressure-gauge" size={24} color="purple" />,
    light: <Entypo name="light-up" size={24} color="black" />,
    air: <Entypo name="air" size={24} color="black" />,
    leaf: <Entypo name="leaf" size={24} color="black" />,
    cloud: <FontAwesome5 name="cloud-sun" size={24} color="red" />,
    fan: <FontAwesome5 name="fan" size={50} color="black" />,
    waterPump: <MaterialCommunityIcons name="water-pump" size={50} color="black" />,
    homeRoof: <MaterialCommunityIcons name="home-roof" size={50} color="black" />,
    settingsSuggest: <MaterialIcons name="settings-suggest" size={50} color="black" />,



  };

export default icons