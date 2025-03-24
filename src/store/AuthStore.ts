import { auth } from "@/config/firebaseConfig";
import { useMutation } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { login } from "./services/authService";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginUserMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      login(data.email, data.password),
    onSuccess: (user) => {
      setUser(user);
    },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, loading, setUser, setLoading, loginUserMutation };
}
