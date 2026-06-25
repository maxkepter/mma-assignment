import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password);
      Alert.alert("Thành công", "Đăng ký tài khoản thành công!");
    } catch (error) {
      let message = "Đăng ký thất bại";
      console.error("Lỗi đăng ký:", error);
      if (error.code === "auth/email-already-in-use") {
        message = "Email đã được sử dụng";
      } else if (error.code === "auth/invalid-email") {
        message = "Email không hợp lệ";
      } else if (error.code === "auth/weak-password") {
        message = "Mật khẩu quá yếu";
      }
      Alert.alert("Lỗi", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Đăng ký</Text>
        <Text style={styles.subtitle}>Tạo tài khoản mới</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu (ít nhất 6 ký tự)"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng ký</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.linkText}>
            Đã có tài khoản? <Text style={styles.linkBold}>Đăng nhập</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  inner: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#4A90D9",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#666",
    fontSize: 14,
  },
  linkBold: {
    color: "#4A90D9",
    fontWeight: "600",
  },
});
