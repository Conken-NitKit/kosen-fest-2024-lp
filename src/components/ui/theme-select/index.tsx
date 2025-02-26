"use client";

import { DropdownMenu, DropdownMenuItem } from "@/components/my-ui/dropdown-menu";
import { FloatingActionButton } from "@/components/my-ui/floating-action-button";
import { Check, MonitorCog, Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { match } from "ts-pattern";

export const ThemeSelect = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu
      trigger={() => (
        <FloatingActionButton size="md" shape="default" color="surface">
          {(props) => <SunMoon {...props} />}
        </FloatingActionButton>
      )}
      selectedLabel={theme}
      role="select"
      onSelect={(label) => {
        setTheme(
          match(label)
            .with("light", (v) => v)
            .with("dark", (v) => v)
            .otherwise(() => "system"),
        );
      }}
    >
      <DropdownMenuItem
        leadingIcon={({ className }) => <MonitorCog className={className} />}
        label="system"
        trailingIcon={({ className, selected }) =>
          selected ? <Check className={className} /> : undefined
        }
      />
      <DropdownMenuItem
        leadingIcon={({ className }) => <Sun className={className} />}
        label="light"
        trailingIcon={({ className, selected }) =>
          selected ? <Check className={className} /> : undefined
        }
      />
      <DropdownMenuItem
        leadingIcon={({ className }) => <Moon className={className} />}
        label="dark"
        trailingIcon={({ className, selected }) =>
          selected ? <Check className={className} /> : undefined
        }
      />
    </DropdownMenu>
  );
};
