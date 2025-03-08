import { View, Text, ScrollView ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { sensor } from '@/data/data'
import { useRouter } from 'expo-router'



type SensorCardProps = {
    icon : React.ReactNode
    title : string
    slug : string
    value : string | number 
    id : string
    unit : string
}
export default function SensorCard({icon , title, slug, value, id, unit}: SensorCardProps) {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/page/grow/growSlug/${slug}?chart=${encodeURIComponent(slug)}&id=${id}`);
  }
  return (
    <TouchableOpacity 
        onPress={handlePress}
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 20,  // Rounded corners
          aspectRatio: 1,  // Maintain square shape
          padding: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 2,  // Add border width
          borderColor: '#4A6741',  // Green border color
          shadowColor: '#000',  // Optional: adds shadow for iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,  // Optional: adds shadow for Android
        }}
    >
      <View className='absolute inset-0 flex justify-center items-center'>
        <Text className="text-2xl font-bold">{String(value)} {unit}</Text>
      </View>
      <View className='absolute bottom-2 right-2 items-end'>
        <View>
          {typeof icon === 'string' ? <Text>{icon}</Text> : icon}
        </View>
        <Text className='text-2xl font-semibold text-gray-800'>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}