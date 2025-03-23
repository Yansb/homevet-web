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
import { cepMask, phoneMask } from "@/helpers/masks";
import { CreateUserDTO } from "@/store/services/userService";
import { useStores } from "@/store";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const signUpSchema = z.object({
  email: z
    .string({ message: "Email é obrigatório" })
    .email({ message: "Email invalido" }),
  password: z
    .string({ message: "Senha é obrigatória" })
    .min(8, "Senha muito curta"),
  passwordConfirm: z
    .string({ message: "Por favor confirme a senha" })
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
    location: z
      .object({
        latitude: z.string(),
        longitude: z.string(),
      })
      .optional(),
  }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function UserSignUpCard() {
  const {
    userStore: { createUserMutation },
    locationStore: { useGetLocationByCepQuery },
  } = useStores();

  const [isLocationSet, setIsLocationSet] = useState(false);

  const navigate = useNavigate();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const cep = form.watch("address.zipCode");
  const debouncedCep = useDebounce(cep?.replace(/\D/g, "") || "", 500);

  const { data: locationData } = useGetLocationByCepQuery(debouncedCep);

  useEffect(() => {
    if (locationData) {
      form.setValue("address.street", locationData.street || "");
      form.setValue("address.city", locationData.city);
      form.setValue("address.state", locationData.state);
      if (locationData.location?.coordinates) {
        form.setValue("address.location", {
          latitude: locationData.location.coordinates.latitude || "",
          longitude: locationData.location.coordinates.longitude || "",
        });
      }
      setIsLocationSet(true);
    }
  }, [locationData]);

  async function onSubmit(data: SignUpFormData) {
    const cleanedPhone = `+55${data.phone.replace(/\s()-/g, "")}`;
    const userData: CreateUserDTO = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: cleanedPhone,
      address: data.address,
    };

    createUserMutation.mutate(userData, {
      onSuccess: () => navigate("/login"),
    });
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirmação de senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="CEP"
                      {...field}
                      onChange={(e) => {
                        const formatted = cepMask(e.target.value);
                        e.target.value = formatted;
                        field.onChange(formatted);
                      }}
                    />
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
                      <Input
                        placeholder="Rua"
                        {...field}
                        disabled={isLocationSet}
                      />
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
                      <Input
                        placeholder="Cidade"
                        {...field}
                        disabled={isLocationSet}
                      />
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
                      <Input
                        placeholder="Estado"
                        {...field}
                        disabled={isLocationSet}
                      />
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
