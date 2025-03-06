import { MyButton } from "@/components/MyButton";
import { MyInput } from "@/components/MyInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "../../services/authService";
import { useNavigate } from "react-router";
import { useStores } from "@/store";

const formSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email(),
  password: z
    .string({ message: "Senha é obrigatória" })
    .min(8, "Senha muito curta"),
});

export function LoginPage() {
  const {
    authStore: { setUser },
  } = useStores();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const user = await login(data.email, data.password);
    setUser(user);
    navigate("/home");
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#FFFFFF]">
      <div className="@container">
        <div className="@[480px]:px-4 @[480px]:py-3">
          <div
            className="flex min-h-[218px] flex-col justify-end overflow-hidden bg-[#FFFFFF] bg-cover bg-center @[480px]:rounded-xl"
            style={{
              backgroundImage:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url('https://cdn.usegalileo.ai/sdxl10/b6ab0664-6772-44f5-9d80-f0c3e78374d4.png')",
            }}
          >
            <div className="flex p-4"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#FFFFFF] p-4 pb-2">
        <h2 className="flex-1 pr-12 pl-12 text-center text-lg leading-tight font-bold tracking-[-0.015em] text-[#141414]">
          HomeVET
        </h2>
      </div>
      <h2 className="tracking-light px-4 pt-5 pb-3 text-center text-[28px] leading-tight font-bold text-[#141414]">
        Bem vindo de volta!
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex min-w-40 flex-1 flex-col">
                  <FormControl>
                    <MyInput placeholder="Email" {...field} />
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
                <FormItem className="flex min-w-40 flex-1 flex-col">
                  <FormControl>
                    <MyInput type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="px-4 pt-1 pb-3 text-sm leading-normal font-normal text-neutral-500 underline">
            Forgot password?
          </p>
          <div className="flex justify-center">
            <div className="flex max-w-[480px] flex-1 flex-col items-stretch gap-3 px-4 py-3">
              <MyButton type="submit">
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
  );
}
