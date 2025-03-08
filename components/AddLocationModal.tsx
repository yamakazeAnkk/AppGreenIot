import React, { useState } from 'react';
import { Modal, TextInput, TouchableOpacity, View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Props for the Modal component
type AddLocationModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddPress: (name: string, location: string, imageUri: string) => Promise<boolean>;
};

const AddLocationModal = ({
  isModalVisible,
  setIsModalVisible,
  handleAddPress,
}: AddLocationModalProps) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !location || !imageUri) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    setLoading(true);
    const success = await handleAddPress(name, location, imageUri);
    setLoading(false);
    if (success) {
      Alert.alert('Success', 'Garden added successfully', [
        { text: 'OK', onPress: () => setIsModalVisible(false) }
      ]);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', width: '90%', maxWidth: 350, padding: 20, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add New Location</Text>

          <TextInput
            style={{ height: 48, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 16, paddingHorizontal: 12, fontSize: 16 }}
            placeholder="Enter garden name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={{ height: 48, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 16, paddingHorizontal: 12, fontSize: 16 }}
            placeholder="Enter Description"
            value={location}
            onChangeText={setLocation}
          />

          <TouchableOpacity
            onPress={pickImage}
            style={{ backgroundColor: '#007bff', paddingVertical: 12, borderRadius: 8, marginBottom: 16 }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Choose Image</Text>
          </TouchableOpacity>

          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 96, height: 96, borderRadius: 8, marginBottom: 16 }}
            />
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{ backgroundColor: '#28a745', paddingVertical: 12, borderRadius: 8, flex: 1, marginRight: 8 }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{ backgroundColor: '#6c757d', paddingVertical: 12, borderRadius: 8, flex: 1, marginLeft: 8 }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddLocationModal;
