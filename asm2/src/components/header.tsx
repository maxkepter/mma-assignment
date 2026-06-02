import React from "react";
import { Text, TextStyle } from "react-native";

interface HeaderProps {
  type?: number;
  title?: string;
  children?: React.ReactNode;
  style?: TextStyle;
}

export default function Header({
  type = 1,
  title,
  children,
  style,
}: HeaderProps) {
  const getFontSize = (type: number): number => {
    switch (type) {
      case 1:
        return 32;
      case 2:
        return 28;
      case 3:
        return 24;
      case 4:
        return 20;
      case 5:
        return 16;
      case 6:
        return 12;
      default:
        return 32;
    }
  };

  return (
    <Text style={[{ fontSize: getFontSize(type), fontWeight: "bold" }, style]}>
      {title || children || `Header ${type}`}
    </Text>
  );
}
