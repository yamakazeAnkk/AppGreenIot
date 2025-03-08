import icons from "@/constants/icons";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export const settings = [
    {
        title: 'Profile',
        icon: AntDesign,
        iconName: 'edit',
    },
    
   
]
export const sensor = [
    {
        title: 'Temperature',
        icon: icons.temperature,
        slug: 'Temperature',
        key: 'Temperature',
    },
    {
        title: 'Humidity',
        icon: icons.landscape ,
        slug: 'Humidity',
        key: 'Humidity',
    },
    {
        title: 'CoPpm',
        icon: icons.wind,
        slug: 'CoPpm',
        key: 'CoPpm',
    },
    {
        title: 'Light Level',
        icon: icons.light,
        slug: 'LightLevel',
        key: 'LightLevel',
    },
    {
        title: 'Soil Moisture',
        icon: icons.leaf,
        slug: 'SoilMoisture',
        key: 'SoilMoisture',
    },
    {
        title: 'Rain',
        icon: icons.water,
        slug: 'IsRaining',
        key: 'IsRaining',
    },
    
]
export const location = [
    {
        id: '6jk2PWTaobJgQCGPlVso',
        name: 'Location',
        gardenImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        
    },
    {
        id: 'JG8OCODvigeOcDjdLNqA',
        name: 'Location',
        gardenImage: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=3008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        
    },
    {
        id: 'TJJ2Y6ra4dwkRFs7dlRK',
        name: 'Location',
        gardenImage: 'https://images.unsplash.com/photo-1604414333193-0fbd8c6a86f8?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        
    },

]
const toggle = [
    {
        title: 'Temperature',
        icon: icons.temperature,
        isActive: true,
        slug: 'temperature',
    },
]