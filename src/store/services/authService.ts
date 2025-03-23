import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword, User } from "firebase/auth";

export async function login(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential.user;
}
