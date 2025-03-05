import { Input } from "./ui/input";



export function MyInput({...props}: React.ComponentProps<"input"> ) {
  return <Input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[#F4F4F4] focus:border-none h-14 placeholder:text-neutral-500 p-4 text-base font-normal leading-normal" {...props} />
}
