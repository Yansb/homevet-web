import { Button } from "./ui/button";
import classNames from "classnames";
type MyButtonVariants = "default" | "ghost";

export function MyButton({
  variant = "default",
  ...props
}: React.ComponentProps<"button"> & {variant?: MyButtonVariants}) {
  const className = classNames(
    "flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 text-base font-bold leading-normal tracking-[0.015em] w-full",
    {
      "bg-[#39E079] text-[#141414]": variant === "default",
      "bg-transparent text-[#141414]": variant === "ghost",
    }
  );
  return <Button className={className} {...props} />
}
