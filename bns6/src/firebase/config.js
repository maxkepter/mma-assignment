import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbXRO3hkdxLmZoUDmJzX4fY0xRWkix4Vc",
  authDomain: "bns6-b71f7.firebaseapp.com",
  projectId: "bns6-b71f7",
  storageBucket: "bns6-b71f7.firebasestorage.app",
  messagingSenderId: "674940181993",
  appId: "1:674940181993:web:0ac30eb68c2e609f04bf78",
  measurementId: "G-PKDGNWZHGK"
};

const app = initializeApp(firebaseConfig);

// Quan trọng: dùng AsyncStorage để persist auth state
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
