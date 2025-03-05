import { MyButton } from "@/components/MyButton";
import { MyInput } from "@/components/MyInput";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});


export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return(
    <div className="relative flex min-h-screen flex-col bg-[#FFFFFF] overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif" }}>
    <div className="@container">
      <div className="@[480px]:px-4 @[480px]:py-3">
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#FFFFFF] @[480px]:rounded-xl min-h-[218px]"
          style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url('https://cdn.usegalileo.ai/sdxl10/b6ab0664-6772-44f5-9d80-f0c3e78374d4.png')" }}
        >
          <div className="flex p-4"></div>
        </div>
      </div>
    </div>
    <div className="flex items-center bg-[#FFFFFF] p-4 pb-2 justify-between">
      <h2 className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12 pr-12">HomeVET</h2>
    </div>
    <h2 className="text-[#141414] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Bem vindo de volta!</h2>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col min-w-40 flex-1">
                <FormControl>
                  <MyInput
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col min-w-40 flex-1">
                <FormControl>
                  <MyInput
                    type="password"
                    placeholder="Senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <p className="text-neutral-500 text-sm font-normal leading-normal pb-3 pt-1 px-4 underline">Forgot password?</p>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
            <MyButton type="submit" >
              <span className="truncate">Log in</span>
            </MyButton>
            <MyButton variant="ghost">
              <span className="truncate">Novo usuario? cadastre-se</span>
            </MyButton>
          </div>
        </div>
      </form>
    </Form>
    <div className="h-5 bg-[#FFFFFF]"></div>
  </div>
  )
}
