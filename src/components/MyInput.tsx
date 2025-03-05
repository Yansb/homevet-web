import { Input } from "./ui/input";

export function MyInput({ ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      className="form-input flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border-none bg-[#F4F4F4] p-4 text-base leading-normal font-normal text-[#141414] placeholder:text-neutral-500 focus:border-none focus:ring-0 focus:outline-0"
      {...props}
    />
  );
}
