import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons'

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

  };

export default icons