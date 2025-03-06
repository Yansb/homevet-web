import { useStores } from "@/store";

export function HomePage() {
  const {
    authStore: { user },
  } = useStores();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>Welcome {user?.email}</h1>
      <span>{user?.uid}</span>
    </div>
  );
}
