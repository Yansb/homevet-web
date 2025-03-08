import { TabsList, Tabs, TabsContent } from "@/components/ui/tabs";

import { TabsTrigger } from "@radix-ui/react-tabs";
import { UserSignUpCard } from "./userSingupCard";

const TabsValues = {
  user: "user",
  vet: "vet",
};

export function SignUpPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Tabs defaultValue={TabsValues.user}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={TabsValues.user}>Usuário</TabsTrigger>
          <TabsTrigger value={TabsValues.vet}>Veterinario</TabsTrigger>
        </TabsList>
        <TabsContent value={TabsValues.user}>
          <UserSignUpCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
