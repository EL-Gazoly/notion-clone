import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
type IconPickerProps = {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
};
const IconPicker = ({ onChange, children, asChild }: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };
  const theme = themeMap[currentTheme];

  const onEmojiClick = (data: { emoji: string }) => {
    console.log(data.emoji);
    onChange(data.emoji);
  };
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className=" p-0 w-full border-none shadow-none">
        <EmojiPicker height={350} theme={theme} onEmojiClick={onEmojiClick} />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
