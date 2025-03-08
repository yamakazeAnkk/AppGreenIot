  import React, { useState, useEffect } from 'react';
  import { SafeAreaView, View, Text, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
  import { Calendar } from 'react-native-calendars';
  import { LineChart } from 'react-native-chart-kit';
  import { Feather } from '@expo/vector-icons';

  interface IsRainingChartProps {
    id: string;
    chart: string;
  }

  export default function IsRainingChart({ id, chart }: IsRainingChartProps) {
    const [viewMode, setViewMode] = useState<'day' | 'month' | 'week'>('day');
    const [dayData, setDayData] = useState<any>(null);
    const [weekData, setWeekData] = useState<any>(null);
    const [monthlyData, setMonthlyData] = useState<any>(null);
    const screenWidth = Dimensions.get('window').width;
    const [selectedDate, setSelectedDate] = useState('2025-02-01');

    useEffect(() => {
      if (viewMode === 'day') {
        const [year, month, day] = selectedDate.split('-');
        fetch(`http://0.0.0.0:8080/api/sensor-data/time/${id}?year=${year}&month=${month}&day=${day}&columnName=IsRaining`)
          .then(response => response.json())
          .then(data => {
            console.log("Day Data:", data);
            if (data && Array.isArray(data.data) && data.data.length > 0) {
              setDayData({
                labels: ["00-03", "03-06", "06-09", "09-12", "12-15", "15-18", "18-21", "21-24"],
                datasets: [{
                  data: data.data,
                }],
              });
            } else {
              console.error('Invalid data for "day" mode:', data);
              setDayData(null);
            }
          })
          .catch(error => {
            console.error('Error fetching day data:', error);
            setDayData(null);
          });
      }
    }, [viewMode, id, selectedDate]);

    useEffect(() => {
      if (viewMode === 'month') {
        const [year, month] = selectedDate.split('-');
        fetch(`http://0.0.0.0:8080/api/sensor-data/monthlyAverage/${id}?year=${year}&month=${month}&week=1&columnName=israining`)
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
              console.error('Invalid data for "month" mode:', data);
              setMonthlyData(null);
            }
          })
          .catch(error => {
            console.error('Error fetching month data:', error);
            setMonthlyData(null);
          });
      }
    }, [viewMode, id, selectedDate]);

    useEffect(() => {
      if (viewMode === 'week') {
        const [year, month, day] = selectedDate.split('-');
        fetch(`http://0.0.0.0:8080/api/sensor-data/weeklyAverage/${id}?year=${year}&month=${month}&day=${day}&columnName=israining`)
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
              console.error('Invalid data for "week" mode:', data);
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
      color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: { borderRadius: 16 },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#019443',
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
            <Feather name="cloud-rain" size={20} color="#019443" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>IsRaining Chart</Text>
        </View>

        <Calendar
          current={selectedDate}
          onDayPress={(day: any) => {
            console.log('Selected day', day.dateString);
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#019443',
            },
          }}
          style={{ marginBottom: 16 }}
        />

        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => setViewMode('day')}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: viewMode === 'day' ? "#019443" : "#ccc",
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
              backgroundColor: viewMode === 'month' ? "#019443" : "#ccc",
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
              backgroundColor: viewMode === 'week' ? "#019443" : "#ccc",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Week</Text>
          </TouchableOpacity>
        </View>

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
