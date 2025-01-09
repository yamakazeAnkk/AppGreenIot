import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import Search from '@/components/Search'
import { Weather } from '@/components/WeatherCard'
import SensorGrid from '@/components/SensorGrid'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const index = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView className='h-full'>
      <View className='flex-1 px-5'>
        <View className='flex flex-row items-center justify-between mt-5'>
          <View className='flex flex-row items-center gap-3'>
            <Image source={require('@/assets/images/avatar.png')} className='w-10 h-10 rounded-full' />
            <Text className='text-base font-rubik-medium text-black-300'>John Doe</Text>
          </View>
        </View>
        <Weather city='Ho Chi Minh City' className='mt-5' />
        <Search />
        <View className='flex-1 pt-5' style={{ marginBottom: tabBarHeight * 0.5}}>
          <SensorGrid />

        </View>
      </View>
    </SafeAreaView> 
  )
}

export default index

