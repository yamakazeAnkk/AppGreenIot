// HybridSection.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export type Section = {
  title: string;
  content: string;
};

type HybridSectionProps = {
  sections: Section[];
};

export default function HybridSection({ sections }: HybridSectionProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <View className="p-4">
      <Text className="text-xl font-semibold mb-4">Basic Knowledge</Text>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleSection(index)}
          className="border-b border-gray-200 py-4"
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-medium flex-1">
              {section.title}
            </Text>
            {expandedSection === index ? (
              <AntDesign name="up" size={20} color="#000" />
            ) : (
              <AntDesign name="down" size={20} color="#000" />
            )}
          </View>
          {expandedSection === index && (
            <Text className="mt-2 text-gray-600">{section.content}</Text>
          )}
        </TouchableOpacity>
      ))}

      {/* Additional Plant Care Information */}
      <View className="mt-4 space-y-4">
        <View>
          <Text className="font-medium mb-1">Light:</Text>
          <Text className="text-gray-600">
            Orchid grass belongs to the group of plants that prefer bright or partially shaded light. Natural light can be used, but the plant will burn in directly planted sunlight.
          </Text>
        </View>
        <View>
          <Text className="font-medium mb-1">Soil:</Text>
          <Text className="text-gray-600">Ensure the soil has good drainage.</Text>
        </View>
        <View>
          <Text className="font-medium mb-1">Water:</Text>
          <Text className="text-gray-600">
            Distilled water or rainwater can be used, avoid using hard water. Water regularly, keeping the soil moist but not soggy.
          </Text>
        </View>
        <View>
          <Text className="font-medium mb-1">Temperature:</Text>
          <Text className="text-gray-600">
            Orchid grass thrives well at an optimal temperature range.
          </Text>
        </View>
      </View>
    </View>
  );
}
