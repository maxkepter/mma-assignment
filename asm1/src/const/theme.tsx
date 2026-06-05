import { Theme } from "../types/theme";
import { ThemeMode } from "../enum/enum";

const LIGHT_THEME = {
  background: "#ffffff",
  text: "#000000",
  primary: "#007bff",
  secondary: "#6c757d",
  success: "#28a745",
  danger: "#dc3545",
};

const DARK_THEME = {
  background: "#121212",
  text: "#ffffff",
  primary: "#1e90ff",
  secondary: "#495057",
  success: "#20c997",
  danger: "#ff6b6b",
};

export const themes: Theme = {
  [ThemeMode.Light]: LIGHT_THEME,
  [ThemeMode.Dark]: DARK_THEME,
};
