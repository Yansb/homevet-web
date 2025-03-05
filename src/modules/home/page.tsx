import { useAuthStore } from "../../store/authStore";

export function HomePage() {
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>Welcome {user?.email}</h1>
      <span>{user?.uid}</span>
      <span className="truncate">{user?.getIdToken()}</span>
    </div>
  );
}
