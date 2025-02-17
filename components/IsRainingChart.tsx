import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface IsRainingChartProps {
  id: string;
  chart: string;
} 
export default function IsRainingChart({id, chart}: IsRainingChartProps) {
  // State lưu chế độ hiển thị: "day" (mặc định) hoặc "month"
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');

  // Dữ liệu cho chế độ Day: lượng mưa (mm) theo 7 ngày trong tuần
  const dataDay = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [5, 10, 0, 15, 20, 0, 5],
      },
    ],
  };

  // Dữ liệu cho chế độ Month: lượng mưa (mm) trung bình cho 12 tháng
  const monthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [50, 60, 40, 80, 100, 90, 70, 85, 60, 50, 45, 55],
      },
    ],
  };

  // Chọn dữ liệu hiện hành dựa trên chế độ viewMode
  const currentData = viewMode === 'day' ? dataDay : monthData;

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ padding: 16 }}>
      {/* Tiêu đề của biểu đồ */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        Rainfall Chart ({viewMode === 'day' ? 'Day View' : 'Month View'})
      </Text>

      {/* Nút chuyển đổi giữa chế độ Day và Month */}
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

      {/* BarChart hiển thị dữ liệu */}
      <View style={{ alignItems: 'center' }}>
        <BarChart
          data={currentData}
          width={screenWidth - 56} // Chiều rộng biểu đồ sau khi trừ padding
          height={180}
          fromZero={true}
          yAxisLabel=""
          yAxisSuffix=" mm"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForBackgroundLines: {
              strokeDasharray: '', // Không dùng đường gạch ngang cho background
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          showValuesOnTopOfBars={true}
        />
      </View>

      {/* Legend: hiển thị từng nhãn bên dưới biểu đồ */}
      
    </View>
  );
}
