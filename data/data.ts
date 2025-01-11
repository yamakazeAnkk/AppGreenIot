import icons from "@/constants/icons";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export const settings = [
    {
        title: 'Edit Profile',
        icon: AntDesign,
        iconName: 'edit',
    },
    {
        title: 'History',
        icon: FontAwesome5,
        iconName: 'history',
    },
    {
        title: 'Phone Number',
        icon: AntDesign,
        iconName: 'phone',
    },
    {
        title: 'Security',
        icon: MaterialIcons,
        iconName: 'security',
    },
   
]
export const sensor = [
    {
        title: 'Temperature',
        icon: icons.temperature,
        slug: 'temperature',
    },
    {
        title: 'Humidity',
        icon: icons.sun,
        slug: 'humidity',
    },
    {
        title: 'Water',
        icon: icons.water,
        slug: 'water',
    },
    {
        title: 'Wind',
        icon: icons.wind,
        slug: 'wind',
    },
    {
        title: 'Light',
        icon: icons.light,
        slug: 'light',
    },
    {
        title: 'Leaf',
        icon: icons.leaf,
        slug: 'leaf',
    },
    
]