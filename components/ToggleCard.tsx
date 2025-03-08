import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type ToggleCardProps = {
  icon: React.ReactNode;
  title: string;
  slug: string;
  isActive: boolean;
  onToggle: () => void;
}

export default function ToggleCard({ icon, title, slug, isActive, onToggle }: ToggleCardProps) {
  return (
    <TouchableOpacity
      onPress={onToggle}  // Trigger the toggle function when the card is clicked
      style={{
        flex: 1,
        backgroundColor: '#F3F4F6', // Light Gray
        borderRadius: 20,
        aspectRatio: 1,
        padding: 16,
        borderWidth: 2,
        borderColor: '#4A6741',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, // Adds shadow for Android
      }}
    >
      {/* Icon */}
      <View style={{ marginTop: 10 }}>
        {typeof icon === 'string' ? <Text style={{ fontSize: 50 }}>{icon}</Text> : icon}
      </View>

      {/* Title */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1F2937', marginTop: 10 }}>
        {title}
      </Text>

      {/* Status & Toggle Switch */}
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginBottom: 10 }}>
        {/* Status Text */}
        <Text style={{ fontSize: 16, color: '#6B7280' }}>
          {isActive ? 'On' : 'Off'}
        </Text>

        {/* Custom Toggle Switch */}
        <TouchableOpacity
          onPress={onToggle}  // Trigger the toggle action on press
          style={{
            width: 50,
            height: 25,
            borderRadius: 15,
            backgroundColor: isActive ? '#FF7F7F' : '#E5E7EB', // Red for "On", Light Gray for "Off"
            justifyContent: 'center',
            paddingHorizontal: 3,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: isActive ? '#FFA07A' : '#6B7280', // Soft Pink for "On", Dark Gray for "Off"
              alignSelf: isActive ? 'flex-end' : 'flex-start',
            }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
