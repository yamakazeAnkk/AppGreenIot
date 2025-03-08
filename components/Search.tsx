import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import icons from '../constants/icons';
import { useDebouncedCallback } from 'use-debounce';

type SearchProps = {
  onSearch: (query: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedCallback((text: string) => {
    onSearch(text);
  }, 1000);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-md bg-accent-100 border border-primary-100 py-5">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        {icons.search}
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for gardens"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>
      <TouchableOpacity>{icons.filter}</TouchableOpacity>
    </View>
  );
};

export default Search;
