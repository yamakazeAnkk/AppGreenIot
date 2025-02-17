// CoPpmChart.tsx
import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';


interface CoPpmChartProps { 
  id: string;
  chart: string;
}
export default function CoPpmChart({id, chart}: CoPpmChartProps) {
  // State lưu chế độ hiển thị: "day" (mặc định) hoặc "month"
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');

  // Dữ liệu cho chế độ Day
  const dayData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [400, 420, 430, 410, 440, 450, 435],
      },
    ],
  };

  // Dữ liệu cho chế độ Month (ví dụ dữ liệu trung bình cho 12 tháng)
  const monthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [410, 415, 420, 425, 430, 435, 440, 445, 440, 435, 430, 425],
      },
    ],
  };


  const currentData = viewMode === 'day' ? dayData : monthData;

 
  const colorsDay = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4'];
  const colorsMonth = [
    '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B',
    '#FFC107', '#FF9800', '#FF5722', '#795548',
    '#9E9E9E', '#607D8B', '#00BCD4', '#009688'
  ];
  
 
  const pieData = currentData.labels.map((label, index) => ({
    name: label,
    population: currentData.datasets[0].data[index],
    color: viewMode === 'day'
      ? colorsDay[index % colorsDay.length]
      : colorsMonth[index % colorsMonth.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        CoPpm Chart ({viewMode === 'day' ? 'Day View' : 'Month View'})
      </Text>

      {/* Toggle Button giữa Day và Month */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => setViewMode('day')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: viewMode === 'day' ? '#4A6741' : '#ccc',
            borderRadius: 8,
            marginRight: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('month')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: viewMode === 'month' ? '#4A6741' : '#ccc',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Month</Text>
        </TouchableOpacity>
      </View>

      <PieChart
        data={pieData}
        width={screenWidth - 56} 
        height={180}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, 
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        accessor="population"         // Dùng key "population" để lấy giá trị
        backgroundColor="transparent"  // Màu nền của PieChart
        paddingLeft="15"               // Padding bên trái để căn chỉnh
        absolute                      // Hiển thị giá trị tuyệt đối
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        
      />
    </View>
  );
}
