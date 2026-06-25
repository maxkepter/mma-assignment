import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { registerForPushNotificationsAsync } from '../services/notificationService';

export default function ProfileScreen() {
  const { user, updateUserEmail, updateUserPassword, updateUserProfile, logout } =
    useAuth();

  // Thông tin user
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [address, setAddress] = useState('');

  // Mật khẩu
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [pushToken, setPushToken] = useState(null);

  useEffect(() => {
    // Đăng ký push notification khi vào profile
    (async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setPushToken(token);
      }
    })();
  }, []);

  // Cập nhật tên hiển thị
  const handleUpdateName = async () => {
    if (!displayName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên');
      return;
    }
    setLoading(true);
    try {
      await updateUserProfile(displayName.trim());
      Alert.alert('Thành công', 'Tên đã được cập nhật');
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật email
  const handleUpdateEmail = async () => {
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email mới');
      return;
    }
    if (!currentPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu hiện tại để xác minh');
      return;
    }
    setLoading(true);
    try {
      await updateUserEmail(email.trim(), currentPassword);
      setCurrentPassword('');
      Alert.alert('Thành công', 'Email đã được cập nhật');
    } catch (error) {
      let message = 'Cập nhật email thất bại';
      if (error.code === 'auth/requires-recent-login') {
        message = 'Vui lòng đăng xuất và đăng nhập lại trước khi đổi email';
      }
      Alert.alert('Lỗi', message);
    } finally {
      setLoading(false);
    }
  };

  // Đổi mật khẩu
  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu hiện tại');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới không khớp');
      return;
    }
    setLoading(true);
    try {
      await updateUserPassword(newPassword, currentPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      Alert.alert('Thành công', 'Mật khẩu đã được thay đổi');
    } catch (error) {
      let message = 'Đổi mật khẩu thất bại';
      if (error.code === 'auth/requires-recent-login') {
        message = 'Vui lòng đăng xuất và đăng nhập lại trước khi đổi mật khẩu';
      }
      Alert.alert('Lỗi', message);
    } finally {
      setLoading(false);
    }
  };

  // Lưu địa chỉ (cần Firestore - demo)
  const handleSaveAddress = () => {
    if (!address.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ');
      return;
    }
    // TODO: Lưu vào Firestore
    Alert.alert('Thành công', 'Địa chỉ đã được lưu');
  };

  const handleLogout = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert('Lỗi', error.message);
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>Vui lòng đăng nhập</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Quản lý tài khoản</Text>

      {/* Thông tin cơ bản */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>

        <Text style={styles.label}>Email hiện tại: {user.email}</Text>

        <Text style={styles.label}>Tên hiển thị</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên của bạn"
          value={displayName}
          onChangeText={setDisplayName}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateName}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cập nhật tên</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Email */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email mới"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu hiện tại (để xác minh)"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateEmail}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Cập nhật Email</Text>
        </TouchableOpacity>
      </View>

      {/* Số điện thoại */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Text style={styles.note}>
          * Cập nhật số điện thoại yêu cầu xác minh OTP (cần tích hợp thêm)
        </Text>
      </View>

      {/* Mật khẩu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đổi mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu hiện tại"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới (6+ ký tự)"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu mới"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdatePassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>

      {/* Địa chỉ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Địa chỉ</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Nhập địa chỉ của bạn"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
          <Text style={styles.buttonText}>Lưu địa chỉ</Text>
        </TouchableOpacity>
      </View>

      {/* Push Token */}
      {pushToken && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Push Notification Token</Text>
          <Text style={styles.tokenText} selectable>
            {pushToken}
          </Text>
        </View>
      )}

      {/* Đăng xuất */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
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
    padding: 20,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
    color: '#333',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4A90D9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  tokenText: {
    fontSize: 11,
    color: '#666',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    fontFamily: Platform?.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
