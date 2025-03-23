import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { phoneMask } from "@/helpers/masks";
import { useMutation } from "@tanstack/react-query";
import { CreateUserDTO, createUser } from "@/services/userService";
import { toast } from "sonner";

const signUpSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email(),
  password: z
    .string({ message: "Senha é obrigatória" })
    .min(8, "Senha muito curta"),
  firstName: z.string({ message: "Nome é obrigatório" }),
  lastName: z.string({ message: "Sobrenome é obrigatório" }),
  phone: z.string({ message: "Telefone é obrigatório" }),
  address: z.object({
    street: z.string({ message: "Rua é obrigatória" }),
    number: z.string({ message: "Número é obrigatório" }).min(1),
    city: z.string({ message: "Cidade é obrigatória" }),
    state: z.string({ message: "Estado é obrigatório" }),
    zipCode: z.string({ message: "CEP é obrigatório" }),
    complement: z.string().optional(),
    addressName: z.string().default("Casa"),
  }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function UserSignUpCard() {
  const navigate = useNavigate();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserDTO) => createUser(data),
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error("Erro ao criar conta. Tente novamente.");
      console.error("Error creating user:", error);
    },
  });

  async function onSubmit(data: SignUpFormData) {
    const cleanedPhone = `+55${data.phone.replace(/\s()-/g, "")}`;
    const userData: CreateUserDTO = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: cleanedPhone,
      address: {
        ...data.address,
        location: {
          latitude: "-12.9948011",
          longitude: "-38.4612307",
        },
      },
    };

    createUserMutation.mutate(userData);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Usuários</CardTitle>
        <CardDescription>Crie aqui sua conta</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="mb-6 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Telefone"
                      value={field.value}
                      onChange={(e) => {
                        const formatted = phoneMask(e.target.value);
                        e.target.value = formatted;
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="CEP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input placeholder="Rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem className="ml-4 flex-shrink-0">
                    <FormControl>
                      <Input
                        className="max-w-24 justify-self-end"
                        placeholder="Número"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Estado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address.complement"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/login")}
            >
              Voltar
            </Button>
            <Button>Cadastrar</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
