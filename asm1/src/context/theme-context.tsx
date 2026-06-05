import { createContext, useState } from "react";
import { themes } from "../const/theme";
import { ThemeColors } from "../types/theme";
import { ThemeMode, ThemeMode as ThemeModeEnum } from "../enum/enum";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themeColors: ThemeColors;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(ThemeModeEnum.Light);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themeColors: themes[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
