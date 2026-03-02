// Chart configuration and theme
export const colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529",
  },
  theme: {
    default: "#ff2200",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340",
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent",
};

export const fonts = {
  base: "Open Sans",
};

export type ChartMode = "light" | "dark";

export const getChartColor = (mode: ChartMode = "light") => {
  return mode === "dark" ? colors.gray[700] : colors.gray[600];
};

export const getGridColor = (mode: ChartMode = "light") => {
  return mode === "dark" ? colors.gray[900] : colors.gray[300];
};