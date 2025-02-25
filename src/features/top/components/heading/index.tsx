import { TypingAnimationText } from "@/components/ui/text/typing-animation";

export const Heading = () => {
  return (
    <TypingAnimationText
      // biome-ignore lint/a11y/useHeadingContent: <explanation>
      element={<h1 />}
      texts={[
        { text: "Welcome", className: "text-on-tertiary-container" },
        { text: "to the" },
        { text: "Conken", className: "text-on-tertiary-container" },
        { text: "exhibit!🚀" },
      ]}
    />
  );
};
