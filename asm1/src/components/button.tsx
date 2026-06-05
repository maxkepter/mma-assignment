import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hook/use-theme";
import { SIZE_STYLES } from "../const/component-styles";
import { Size, ThemeMode, Variant } from "../enum/enum";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: object;
  disabled?: boolean;
  size?: Size;
  variant?: Variant;
}

export default function Button(props: ButtonProps) {
  const { themeColors } = useTheme();
  const size = props.size || Size.Medium;
  const variant = props.variant || Variant.Primary;
  const isDisabled = props.disabled || false;

  const sizeStyle = SIZE_STYLES[size];
  const backgroundColor = themeColors[variant as keyof typeof themeColors];
  const opacity = isDisabled ? 0.6 : 1;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={{
        backgroundColor,
        paddingVertical: sizeStyle.paddingVertical,
        paddingHorizontal: sizeStyle.paddingHorizontal,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        minHeight: sizeStyle.minHeight,
        opacity,
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: sizeStyle.fontSize,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
