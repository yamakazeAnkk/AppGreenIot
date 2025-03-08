import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ 
            headerShown: false ,
            tabBarActiveTintColor: '#7E9351',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'white',
                position: 'absolute',
                paddingTop : 10,
                marginTop: 20,
            }
        }}
    >
      <Tabs.Screen 
            name="index" 
            options={{ 
                tabBarIcon: ({ focused }) => (
                    <Ionicons name="home" size={28} color={focused ? '#7E9351' : 'gray'} />
                )
            }} 
        />
      <Tabs.Screen 
            name="dashboard" 
            options={{ 
                tabBarIcon: ({ focused }) => (
                    <AntDesign name="wechat" size={28} color={focused ? '#7E9351' : 'gray'} />
                )
            }} 
        />
      <Tabs.Screen 
            name="notification" 
            options={{ 
                tabBarIcon: ({ focused }) => (
                    <Ionicons name="notifications" size={28} color={focused ? '#7E9351' : 'gray'} />
                )
            }} 
        />
      <Tabs.Screen 
            name="profile" 
            options={{ 
                tabBarIcon: ({ focused }) => (
                    <Ionicons name="person" size={28} color={focused ? '#7E9351' : 'gray'} />
                )
            }} 
        />
    </Tabs>
  )
}

export default TabsLayout