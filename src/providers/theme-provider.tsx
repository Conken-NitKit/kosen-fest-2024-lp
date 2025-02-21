"use client";

import { type PropsWithChildren, createContext, useCallback, useContext } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import { match } from "ts-pattern";

type Theme = "light" | "dark" | "system" | undefined;

type ContextType = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
};
const ThemeContext = createContext<ContextType | null>(null);
export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a <ThemeProvider />");
  }

  return context;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setThemeState] = useLocalStorage<Theme>("theme");

  // 初回のみhtmlタグにclass=themeを追加する。
  useEffectOnce(() => {
    // document.documentElement.classList.add(theme);
    // themeが保存されていないとき
    if (!theme) {
      setThemeState("system");
    }

    match(theme)
      .with(undefined, "system", () => {
        // OSの設定がダークモードの場合のみダークモードにする
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark");
        }
      })
      .with("dark", () => {
        document.documentElement.classList.add("dark");
      })
      .otherwise(() => {
        // ライトモードにする
        document.documentElement.classList.remove("dark");
      });
  });

  // OSの設定が変更されたときに変更
  useEffectOnce(() => {
    const mediaQueryListener = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        console.log(theme);
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", mediaQueryListener);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", mediaQueryListener);
  });

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);

      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (newTheme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        // System が選択された場合は OS の設定を見て切り替える
        document.documentElement.classList.toggle(
          "dark",
          window.matchMedia("(prefers-color-scheme: dark)").matches,
        );
      }
    },
    [setThemeState],
  );

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
