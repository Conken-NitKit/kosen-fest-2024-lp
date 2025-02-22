import { DropdownMenu, DropdownMenuItem } from "@/components/my-ui/dropdown-menu";
import { FloatingActionButton } from "@/components/my-ui/floating-action-button";
import { SunMoon } from "lucide-react";
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
      <DropdownMenuItem label="light" />
      <DropdownMenuItem label="dark" />
      <DropdownMenuItem label="system" />
    </DropdownMenu>
  );
};
