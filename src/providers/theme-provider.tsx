"use client";

import { type PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;
export type Theme = (typeof THEME)[keyof typeof THEME];

type ThemeContextType = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
};
const ThemeContext = createContext<ThemeContextType>(undefined as unknown as ThemeContextType);
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setThemeState] = useState<Theme>(
    (localStorage.getItem("theme") as Theme | null) || THEME.LIGHT,
  );

  // 初回のみhtmlタグにclass=themeを追加する。綺麗に書く方法が思いつかなかった
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Background>{children}</Background>
    </ThemeContext.Provider>
  );
};

const Background = ({ children }: PropsWithChildren) => {
  return <div className="bg-background transition duration-500 ease-in-out">{children}</div>;
};
