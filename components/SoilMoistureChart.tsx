import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface SoilMoistureChartProps {
  id: string;
  chart: string;
}
export default function SoilMoistureChart({id, chart}: SoilMoistureChartProps) {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  
  // Dữ liệu cho chế độ Week (7 ngày trong tuần)
  const weekData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [30, 35, 33, 40, 38, 36, 34],
      },
    ],
  };

  // Dữ liệu cho chế độ Month (4 tuần)
  const monthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [33, 37, 35, 36],
      },
    ],
  };

  const currentData = viewMode === 'week' ? weekData : monthData;
  const screenWidth = Dimensions.get('window').width;
  
  // Định nghĩa màu chủ đạo mới cho Soil Moisture Chart (màu Sienna)
  const barColor = "#A0522D"; // Sienna

  // Cấu hình chart với màu sắc mới và tùy chỉnh cho các cột
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(160, 82, 45, ${opacity})`, // Sienna với opacity
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForBackgroundLines: {
      strokeDasharray: "", // không gạch ngang
    },
    // Tùy chỉnh các cột (nếu hỗ trợ)
    propsForBars: {
      rx: 6,
      ry: 6,
    },
  };

  return (
    <View style={{ padding: 16 }}>
      {/* Tiêu đề */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        Soil Moisture Chart ({viewMode === 'week' ? 'Week View' : 'Month View'})
      </Text>

      {/* Toggle Button */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => setViewMode('week')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: viewMode === 'week' ? barColor : "#ccc",
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
            backgroundColor: viewMode === 'month' ? barColor : "#ccc",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Month</Text>
        </TouchableOpacity>
      </View>

      {/* BarChart */}
      <View style={{ alignItems: 'center' }}>
        <BarChart
          data={currentData}
          width={screenWidth - 56} // Chiều rộng biểu đồ, tạo khoảng cách đều ở hai bên
          height={180}
          fromZero={true}
          yAxisLabel=""
          yAxisSuffix=" %"
          chartConfig={chartConfig}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          showValuesOnTopOfBars={true}
        />
      </View>

     
    </View>
  );
}
