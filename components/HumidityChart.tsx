import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

interface HumidityProgressChartProps {
  id: string;
  chart: string;
}
export default function HumidityProgressChart({id, chart}: HumidityProgressChartProps) {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const screenWidth = Dimensions.get('window').width;

  // Dữ liệu cho chế độ Day (7 ngày trong tuần)
  const dayData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [0.6, 0.65, 0.7, 0.68, 0.72, 0.75, 0.69],
  };

  // Dữ liệu cho chế độ Week (4 tuần, giá trị tổng hợp)
  const weekData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [0.70, 0.68, 0.72, 0.74],
  };

  const currentData = viewMode === 'day' ? dayData : weekData;

  // Chart config cố định với một màu duy nhất
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={{ padding: 16 }}>
      {/* Tiêu đề */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        Humidity Progress Chart ({viewMode === 'day' ? 'Day View' : 'Week View'})
      </Text>

      {/* Toggle Button giữa Day và Week */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => setViewMode('day')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: viewMode === 'day' ? "#007AFF" : "#ccc",
            borderRadius: 8,
            marginRight: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('week')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: viewMode === 'week' ? "#007AFF" : "#ccc",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Week</Text>
        </TouchableOpacity>
      </View>

      {/* Bọc ProgressChart trong một View căn giữa */}
      <View style={{ alignItems: 'center' }}>
        <ProgressChart
          data={currentData}
          width={screenWidth - 56}  // Giảm width để tạo khoảng cách đều ở 2 bên
          height={230}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          style={{ borderRadius: 16 }}
        />
      </View>
    </View>
  );
}
