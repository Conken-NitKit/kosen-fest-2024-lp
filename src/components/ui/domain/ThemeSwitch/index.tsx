"use client";

import { Moon, Sun } from "lucide-react";

import { THEME, useThemeContext } from "@/providers/theme-provider";
import { Switch } from "../../base/Switch";

export const ThemeSwitch = () => {
  const { setTheme, theme } = useThemeContext();

  return (
    <Switch
      onCheckedChange={(checked) => {
        setTheme(checked ? THEME.DARK : THEME.LIGHT);
      }}
      checked={theme === THEME.DARK}
      className="h-7 w-11"
      thumbProps={{
        className: "h-6 w-6 flex items-center justify-center",
      }}
    >
      {theme === THEME.DARK ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
      )}
    </Switch>
  );
};
