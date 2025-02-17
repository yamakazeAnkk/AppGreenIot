import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';

interface TemperatureChartProps {
  id: string;
  chart: string;
}

export default function TemperatureChart({id, chart}: TemperatureChartProps) {
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');
  const [dayData, setDayData] = useState<any>(null); // State to hold the day data
  const [weekData, setWeekData] = useState<any>(null); // State to hold the week data
  const screenWidth = Dimensions.get('window').width;

  // Fetch data for 'day' view
  
  useEffect(() => {
    if (viewMode === 'day') {
      fetch(`http://0.0.0.0:8080/api/sensor-data/time/${id}?year=2025&month=2&day=1&columnName=Temperature`)
        .then(response => response.json())
        .then(data => {
          console.log("Day Data:", data);
  
          // Kiểm tra xem dữ liệu có chứa khóa 'data' và mảng không
          if (data && Array.isArray(data.data) && data.data.length > 0) {
            setDayData({
              labels: [
                "00-03", "03-06", "06-09", "09-12", 
                "12-15", "15-18", "18-21", "21-24"
              ],
              datasets: [{
                data: data.data, // Sử dụng trực tiếp mảng trong data.data
              }],
            });
          } else {
            console.error('Dữ liệu không hợp lệ cho chế độ "day":', data);
          }
        })
        .catch(error => console.error('Error fetching day data:', error));
    }
  }, [viewMode, id]);
  

  // Fetch data for 'month' view
  useEffect(() => {
    if (viewMode === 'month') {
      fetch(`http://0.0.0.0:8080/api/sensor-data/weeklyAverage/${id}?year=2025&month=2&week=1&columnName=Temperature`)
        .then(response => response.json())
        .then(data => {
          console.log("Week Data:", data);

          // Kiểm tra nếu data là mảng và chứa dữ liệu cần thiết
          if (data && Array.isArray(data.data) && data.data.length > 0) {
            setWeekData({
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              datasets: [{
                data: data.data // Giả sử 'average' là khóa dữ liệu
              }],
            });
          } else {
            console.error('Dữ liệu không hợp lệ cho chế độ "month":', data);
          }
        })
        .catch(error => console.error('Error fetching week data:', error));
    }
  }, [viewMode, id]);

  // Choose the data based on the view mode
  const currentData = viewMode === 'day' ? dayData : weekData;

  // Chart config using orange-red color
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 69, 0, ${opacity})`, // OrangeRed
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#FF4500',
    },
  };

  if (!currentData) {
    return <Text>Loading...</Text>; // Show loading text while data is being fetched
  }

  return (
    <View style={{ padding: 16 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View
          style={{
            width: 32,
            height: 32,
            backgroundColor: '#FFE4E1',
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 8,
          }}
        >
          <Feather name="thermometer" size={20} color="#FF4500" />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Temperature Chart</Text>
      </View>

      {/* Toggle Buttons */}
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => setViewMode('day')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: viewMode === 'day' ? "#FF4500" : "#ccc",
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
            backgroundColor: viewMode === 'month' ? "#FF4500" : "#ccc",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Month</Text>
        </TouchableOpacity>
      </View>

      {/* LineChart */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <LineChart
            data={currentData}
            width={screenWidth * 1.2} // Increase chart width
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>
      </ScrollView>

      {/* Additional info */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'gray', fontSize: 12 }}>Average</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>24°C</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'gray', fontSize: 12 }}>Optimal</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>23-26°C</Text>
        </View>
      </View>
    </View>
  );
}
