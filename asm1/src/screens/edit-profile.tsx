import { useContext } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { UserContext } from "../context/user-context";
import { useFormik } from "formik";
import Header from "../components/header";
import Button from "../components/button";
import { Variant, Size } from "../enum/enum";
import { useTheme } from "../hook/use-theme";

export default function EditProfile({ navigation }: { navigation: any }) {
  const userContext = useContext(UserContext);
  const user = userContext?.user || null;
  const setUser = userContext?.setUser || null;
  const { themeColors } = useTheme();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    avatarUrl: Yup.string().url("Invalid URL format"),
    bio: Yup.string()
      .min(10, "Bio must be at least 10 characters")
      .required("Bio is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      avatarUrl: user?.avatarUrl || "",
      bio: user?.bio || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (setUser) {
        setUser({
          name: values.name,
          avatarUrl: values.avatarUrl,
          bio: values.bio,
        });
      }
    },
  });

  const getErrorMessage = (fieldName: string) => {
    return formik.touched[fieldName as keyof typeof formik.touched] &&
      formik.errors[fieldName as keyof typeof formik.errors]
      ? formik.errors[fieldName as keyof typeof formik.errors]
      : null;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: themeColors.background }}
    >
      {/* <Header /> */}
      <View style={{ padding: 24, paddingBottom: 40 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 24,
            color: themeColors.text,
          }}
        >
          Update Information
        </Text>

        {/* Name Field */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontWeight: "600",
              marginBottom: 8,
              color: themeColors.text,
              fontSize: 14,
            }}
          >
            Name
          </Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor={themeColors.secondary}
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            style={{
              borderWidth: 1,
              borderColor: getErrorMessage("name")
                ? themeColors.danger
                : themeColors.secondary,
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
              backgroundColor:
                themeColors.background === "#ffffff" ? "#fff" : "#2a2a2a",
              fontSize: 14,
              color: themeColors.text,
            }}
          />
          {getErrorMessage("name") && (
            <Text style={{ color: themeColors.danger, fontSize: 12, marginBottom: 4 }}>
              {getErrorMessage("name")}
            </Text>
          )}
          <Text style={{ fontSize: 12, color: themeColors.secondary }}>
            At least 2 characters
          </Text>
        </View>

        {/* Avatar URL Field */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontWeight: "600",
              marginBottom: 8,
              color: themeColors.text,
              fontSize: 14,
            }}
          >
            Avatar URL
          </Text>
          <TextInput
            placeholder="Enter your avatar url"
            placeholderTextColor={themeColors.secondary}
            value={formik.values.avatarUrl}
            onChangeText={formik.handleChange("avatarUrl")}
            onBlur={formik.handleBlur("avatarUrl")}
            style={{
              borderWidth: 1,
              borderColor: getErrorMessage("avatarUrl")
                ? themeColors.danger
                : themeColors.secondary,
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
              backgroundColor:
                themeColors.background === "#ffffff" ? "#fff" : "#2a2a2a",
              fontSize: 14,
              color: themeColors.text,
            }}
          />
          {getErrorMessage("avatarUrl") && (
            <Text style={{ color: themeColors.danger, fontSize: 12 }}>
              {getErrorMessage("avatarUrl")}
            </Text>
          )}
        </View>

        {/* Bio Field */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontWeight: "600",
              marginBottom: 8,
              color: themeColors.text,
              fontSize: 14,
            }}
          >
            Bio
          </Text>
          <TextInput
            placeholder="Enter your bio"
            placeholderTextColor={themeColors.secondary}
            value={formik.values.bio}
            onChangeText={formik.handleChange("bio")}
            onBlur={formik.handleBlur("bio")}
            multiline
            numberOfLines={4}
            style={{
              borderWidth: 1,
              borderColor: getErrorMessage("bio")
                ? themeColors.danger
                : themeColors.secondary,
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
              backgroundColor:
                themeColors.background === "#ffffff" ? "#fff" : "#2a2a2a",
              fontSize: 14,
              textAlignVertical: "top",
              color: themeColors.text,
            }}
          />
          {getErrorMessage("bio") && (
            <Text style={{ color: themeColors.danger, fontSize: 12, marginBottom: 4 }}>
              {getErrorMessage("bio")}
            </Text>
          )}
          <Text style={{ fontSize: 12, color: themeColors.secondary }}>
            At least 10 characters
          </Text>
        </View>

        {/* Buttons */}
        <View style={{ gap: 12 }}>
          <Button
            title="Save Changes"
            variant={Variant.Primary}
            size={Size.Large}
            onPress={() => {
              formik.handleSubmit();
              if (formik.isValid) {
                navigation.navigate("Profile");
              }
            }}
          />
          <Button
            title="Cancel"
            variant={Variant.Secondary}
            size={Size.Large}
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </View>
    </ScrollView>
  );
}
