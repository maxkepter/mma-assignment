import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { addPhoto } from '../storage';
import { generateCaption } from '../services/gemini';
import { generateId } from '../utils';

export default function CameraScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [caption, setCaption] = useState('');

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Lỗi', 'Cần cấp quyền camera để chụp ảnh.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  }

  async function savePhoto() {
    if (!image) return;
    setSaving(true);

    try {
      // Lấy vị trí hiện tại
      const { status } = await Location.requestForegroundPermissionsAsync();
      let location = null;
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        location = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };

        // Gọi Gemini để mô tả ảnh
        const genCaption = await generateCaption(image);
        setCaption(genCaption);

        const photo = {
          id: generateId(),
          uri: image,
          caption: genCaption,
          location,
          timestamp: Date.now(),
        };

        await addPhoto(photo);
        Alert.alert('✅ Đã lưu!', 'Ảnh đã được lưu thành công.', [
          { text: 'Xem danh sách', onPress: () => navigation.navigate('Home') },
        ]);
      }
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Lỗi', 'Không thể lưu ảnh. Vui lòng thử lại.');
    } finally {
      setSaving(false);
      setImage(null);
      setCaption('');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.preview} />
            {caption ? (
              <View style={styles.captionBox}>
                <Text style={styles.captionLabel}>Mô tả:</Text>
                <Text style={styles.captionText}>{caption}</Text>
              </View>
            ) : null}
            {saving ? (
              <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
            ) : (
              <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
                <Text style={styles.saveButtonText}>💾 Lưu ảnh</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: '#666' }]}
              onPress={() => {
                setImage(null);
                setCaption('');
              }}
            >
              <Text style={styles.saveButtonText}>🔁 Chụp lại</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📸</Text>
            <Text style={styles.emptyText}>Chụp ảnh mới</Text>
            <Text style={styles.emptySubtext}>
              Nhấn nút bên dưới để mở camera
            </Text>
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <Text style={styles.captureButtonText}>Mở Camera</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  preview: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    marginBottom: 16,
  },
  captionBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
  },
  captionLabel: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  captionText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  captureButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  captureButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});
