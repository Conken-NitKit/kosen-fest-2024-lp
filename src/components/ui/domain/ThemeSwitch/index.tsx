"use client";

import { useIsClient } from "@/hooks/use-is-client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../../base/Switch";

export const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  const { isClient } = useIsClient();

  return (
    isClient && (
      <Switch
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
        checked={theme === "dark"}
        className="h-7 w-11"
        thumbProps={{
          className: "h-6 w-6 flex items-center justify-center",
        }}
      >
        {theme === "dark" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400" />
        )}
      </Switch>
    )
  );
};
