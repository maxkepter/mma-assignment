import AsyncStorage from '@react-native-async-storage/async-storage';

const PHOTOS_KEY = '@photo_memoir_photos';

/**
 * @typedef {Object} PhotoItem
 * @property {string} id
 * @property {string} uri - Local file URI
 * @property {string} caption - Gemini-generated description
 * @property {{latitude: number, longitude: number}|null} location
 * @property {number} timestamp
 */

/** @returns {Promise<PhotoItem[]>} */
export async function getPhotos() {
  const json = await AsyncStorage.getItem(PHOTOS_KEY);
  if (json) {
    try {
      return JSON.parse(json);
    } catch {
      return [];
    }
  }
  return [];
}

/** @param {PhotoItem} photo */
export async function addPhoto(photo) {
  const photos = await getPhotos();
  photos.unshift(photo); // newest first
  await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
  return photos;
}

/** @param {string} id */
export async function deletePhoto(id) {
  let photos = await getPhotos();
  photos = photos.filter(p => p.id !== id);
  await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
  return photos;
}
