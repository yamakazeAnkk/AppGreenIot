import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { sensor } from '@/data/data'
import SensorCard from './SensorCard'


export default function SensorGrid() {
  return (
    <ScrollView 
        className="bg-gray-100  "
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
    >
        <View className='flex-row flex-wrap justify-between pt-4'>
            {sensor.map((item, index) => (
                <View key={index} className='w-[48%] mb-4 border-none rounded-3xl'>
                    <SensorCard icon={item.icon} title={item.title} slug={item.slug}/>
                </View>
            ))}
        </View>
    </ScrollView>   
  )
}