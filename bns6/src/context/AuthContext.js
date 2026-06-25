import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Đăng nhập
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  // Đăng ký
  const register = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Cập nhật email (cần re-authentication)
  const updateUserEmail = async (newEmail, password) => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);
    } catch (error) {
      throw error;
    }
  };

  // Đổi mật khẩu (cần re-authentication)
  const updateUserPassword = async (newPassword, currentPassword) => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (error) {
      throw error;
    }
  };

  // Cập nhật displayName (họ tên)
  const updateUserProfile = async (displayName) => {
    try {
      await updateProfile(auth.currentUser, { displayName });
    } catch (error) {
      throw error;
    }
  };

  // Cập nhật số điện thoại (qua Firebase cần xác minh OTP - riêng)
  // Lưu địa chỉ vào Firebase Realtime Database / Firestore (sẽ làm sau)

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserEmail,
        updateUserPassword,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được dùng trong AuthProvider');
  }
  return context;
};
