import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface LightLevelChartProps {
  id: string;
  chart: string;
}
export default function LightLevelChart({id, chart}: LightLevelChartProps) {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  
  // Dữ liệu cho chế độ Week: mức ánh sáng (lx) theo từng ngày
  const weekData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [300, 350, 400, 380, 420, 390, 360],
      },
    ],
  };

  // Dữ liệu cho chế độ Month: trung bình mức ánh sáng theo tuần (4 tuần)
  const monthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [380, 390, 400, 370],
      },
    ],
  };

  const currentData = viewMode === 'week' ? weekData : monthData;
  const screenWidth = Dimensions.get('window').width;
  
  // Màu chủ đạo cho LightLevel Chart (vàng - cam)
  const lightColor = '#F5A623';

  // Chart config cho LineChart
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => lightColor,  // sử dụng màu chủ đạo cố định
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: lightColor,
    },
  };

  return (
    <View style={{ padding: 16 }}>
      {/* Tiêu đề */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        Light Level Chart ({viewMode === 'week' ? 'Week View' : 'Month View'})
      </Text>
      
      {/* Toggle Button */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => setViewMode('week')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: viewMode === 'week' ? lightColor : '#ccc',
            borderRadius: 8,
            marginRight: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('month')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: viewMode === 'month' ? lightColor : '#ccc',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Month</Text>
        </TouchableOpacity>
      </View>

      {/* LineChart */}
      <View style={{ alignItems: 'center' }}>
        <LineChart
          data={currentData}
          width={screenWidth - 56} // Tạo khoảng cách đều ở hai bên
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* Legend */}
      <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-around' }}>
        {currentData.labels.map((label, index) => (
          <Text key={index} style={{ fontSize: 14 }}>{label}</Text>
        ))}
      </View>
    </View>
  );
}
