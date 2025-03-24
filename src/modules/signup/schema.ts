import { z } from "zod";

export const signUpSchema = z.object({
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
  radius: z.number().int().positive(),
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
  isAttendingAddressSameAsAddress: z.boolean().default(false),
  licenseNumber: z.string({ message: "Numero do CRMV é obrigatorio" }),
  attendingAddress: z
    .object({
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
    })
    .optional(),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
