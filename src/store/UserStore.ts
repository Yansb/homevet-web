import { createUser, CreateUserDTO } from "@/store/services/userService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUsers() {
  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserDTO) => createUser(data),
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar conta. Tente novamente.");
      console.error("Error creating user:", error);
    },
  });

  return { createUserMutation };
}
