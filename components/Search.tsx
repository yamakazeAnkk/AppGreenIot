import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useDebouncedCallback } from 'use-debounce'


const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{query?: 'string'}>()
    const [search, setSearch] = useState<string | undefined>(params.query)

    const handleSearch = (text: string) => {
        setSearch(text); 
        debouncedSearch(text); 
      };
    const debouncedSearch = useDebouncedCallback((text: string) => {
        router.setParams({ query: text });
      }, 1000)      
    return (
        <View className="flex flex-row items-center justify-between w-full px-4 rounded-md bg-accent-100 border border-primary-100 py-5">
            <View className="flex-1 flex flex-row items-center justify-start z-50">
                {icons.search}
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Search for anything"
                    className="text-sm font-rubik text-black-300 ml-2 flex-1"
                />
            </View>
            <TouchableOpacity>
                {icons.filter}
            </TouchableOpacity>
        </View>
        )
    }

export default Search