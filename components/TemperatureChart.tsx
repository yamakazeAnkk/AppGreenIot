import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';

interface TemperatureChartProps {
  id: string;
  chart: string;
}

export default function TemperatureChart({ id, chart }: TemperatureChartProps) {
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'week'>('day'); // Cập nhật viewMode để bao gồm 'week'
  const [dayData, setDayData] = useState<any>(null);
  const [weekData, setWeekData] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any>(null);
  const screenWidth = Dimensions.get('window').width;

  // Sử dụng state để lưu ngày được chọn dưới dạng chuỗi "YYYY-MM-DD"
  const [selectedDate, setSelectedDate] = useState('2025-02-01');

  // Fetch dữ liệu cho chế độ "day"
  useEffect(() => {
    if (viewMode === 'day') {
      const [year, month, day] = selectedDate.split('-');
      fetch(`http://0.0.0.0:8080/api/sensor-data/time/${id}?year=${year}&month=${month}&day=${day}&columnName=Temperature`)
        .then(response => response.json())
        .then(data => {
    
          if (data && Array.isArray(data.data) && data.data.length > 0) {
            setDayData({
              labels: ["00-03", "03-06", "06-09", "09-12", "12-15", "15-18", "18-21", "21-24"],
              datasets: [{
                data: data.data,
              }],
            });
          } else {
            console.error('Dữ liệu không hợp lệ cho chế độ "day":', data);
            setDayData(null);
          }
        })
        .catch(error => {
          console.error('Error fetching day data:', error);
          setDayData(null);
        });
    }
  }, [viewMode, id, selectedDate]);

  // Fetch dữ liệu cho chế độ "month"
  useEffect(() => {
    if (viewMode === 'month') {
      const [year, month] = selectedDate.split('-');
      fetch(`http://0.0.0.0:8080/api/sensor-data/monthlyAverage/${id}?year=${year}&month=${month}&week=1&columnName=Temperature`)
        .then(response => response.json())
        .then(data => {
          console.log("Month Data:", data);
          if (data && Array.isArray(data.data) && data.data.length > 0) {
            setMonthlyData({
              labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
              datasets: [{
                data: data.data,
              }],
            });
          } else {
            console.error('Dữ liệu không hợp lệ cho chế độ "month":', data);
            setMonthlyData(null);
          }
        })
        .catch(error => {
          console.error('Error fetching month data:', error);
          setMonthlyData(null);
        });
    }
  }, [viewMode, id, selectedDate]);

  // Fetch dữ liệu cho chế độ "week"
  useEffect(() => {
    if (viewMode === 'week') {
      const [year, month, day] = selectedDate.split('-');
      fetch(`http://0.0.0.0:8080/api/sensor-data/weeklyAverage/${id}?year=${year}&month=${month}&day=${day}&columnName=SoilMoisture`)
        .then(response => response.json())
        .then(data => {
          console.log("Week Data:", data);
          if (data && Array.isArray(data.data) && data.data.length > 0) {
            setWeekData({
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [{
                data: data.data,
              }],
            });
          } else {
            console.error('Dữ liệu không hợp lệ cho chế độ "week":', data);
            setWeekData(null);
          }
        })
        .catch(error => {
          console.error('Error fetching week data:', error);
          setWeekData(null);
        });
    }
  }, [viewMode, id, selectedDate]);

  const currentData = viewMode === 'day' ? dayData : viewMode === 'month' ? monthlyData : weekData;

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 69, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#FF4500',
    },
  };

  if (!currentData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
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

      {/* Calendar */}
      <Calendar
        current={selectedDate}
        onDayPress={(day: any) => {
          console.log('Selected day', day.dateString);
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#FF4500',
          },
        }}
        style={{ marginBottom: 16 }}
      />

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
            marginRight: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('week')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: viewMode === 'week' ? "#FF4500" : "#ccc",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Week</Text>
        </TouchableOpacity>
      </View>

      {/* LineChart */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <LineChart
            data={currentData}
            width={screenWidth * 1.2}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </View>
      </ScrollView>

      {/* Additional Info */}
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
    </SafeAreaView>
  );
}
