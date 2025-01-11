import { View, Text, ScrollView ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { sensor } from '@/data/data'
import { useRouter } from 'expo-router'


type SensorCardProps = {
    icon : React.ReactNode
    title : string
    slug : string
}
export default function SensorCard({icon , title, slug}: SensorCardProps) {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/page/${slug}`);
  }
  return (
    <TouchableOpacity 
        onPress={handlePress}
        className='flex-1 bg-white relative aspect-square border-none rounded-3xl'
    >
        <View className="flex-1 justify-center items-center">
            <View className="mb-4">
                {icon}
            </View>
            <Text className="text-2xl font-semibold text-gray-800 mb-1">
                {title}
            </Text>
      </View>
    </TouchableOpacity>
  )
}