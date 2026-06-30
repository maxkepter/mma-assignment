import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getPhotos, deletePhoto } from '../storage';
import * as FileSystem from 'expo-file-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DetailScreen({ route, navigation }) {
  const { photoId } = route.params;
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    loadPhoto();
  }, []);

  async function loadPhoto() {
    const photos = await getPhotos();
    const found = photos.find(p => p.id === photoId);
    setPhoto(found || null);
  }

  async function handleDelete() {
    Alert.alert(
      'Xác nhận xoá',
      'Bạn có chắc chắn muốn xoá ảnh này?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            if (photo?.uri) {
              // Xoá file ảnh khỏi bộ nhớ thiết bị
              try {
                await FileSystem.deleteAsync(photo.uri, { idempotent: true });
              } catch (e) {
                console.warn('Could not delete file:', e);
              }
            }
            await deletePhoto(photoId);
            Alert.alert('✅ Đã xoá', 'Ảnh đã được xoá thành công.');
            navigation.goBack();
          },
        },
      ]
    );
  }

  if (!photo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 12, color: '#999' }}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Ảnh */}
      <Image source={{ uri: photo.uri }} style={styles.image} />

      {/* Thông tin */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📅</Text>
          <Text style={styles.infoValue}>
            {new Date(photo.timestamp).toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        {photo.location && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍</Text>
            <Text style={styles.infoValue}>
              {photo.location.latitude.toFixed(4)}, {photo.location.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        {/* Bản đồ */}
        {photo.location && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: photo.location.latitude,
                longitude: photo.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={true}
              zoomEnabled={true}
            >
              <Marker
                coordinate={{
                  latitude: photo.location.latitude,
                  longitude: photo.location.longitude,
                }}
                title="Vị trí chụp ảnh"
                description={`${photo.location.latitude.toFixed(4)}, ${photo.location.longitude.toFixed(4)}`}
              />
            </MapView>
          </View>
        )}

        {!photo.location && (
          <View style={styles.noLocationBox}>
            <Text style={styles.noLocationText}>
              ⚠️ Không có thông tin vị trí cho ảnh này
            </Text>
          </View>
        )}

        {/* Mô tả từ Gemini */}
        <Text style={styles.sectionTitle}>📝 Mô tả (Gemini AI)</Text>
        <View style={styles.captionBox}>
          <Text style={styles.captionText}>
            {photo.caption || 'Chưa có mô tả.'}
          </Text>
        </View>
      </View>

      {/* Nút xoá */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>🗑️ Xoá ảnh</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
    resizeMode: 'cover',
    backgroundColor: '#e0e0e0',
  },
  infoSection: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 18,
    marginRight: 8,
  },
  infoValue: {
    fontSize: 15,
    color: '#555',
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 12,
  },
  map: {
    flex: 1,
  },
  noLocationBox: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  noLocationText: {
    color: '#E65100',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  captionBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  captionText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
