import { UseFormReturn } from "react-hook-form";
import { SignUpFormData } from "../schema";
import { Map } from "@/components/Map";

export function DoctorSignUpThirdStep({
  form,
}: {
  form: UseFormReturn<SignUpFormData>;
}) {
  const initialPosition = [
    Number(form.getValues("address.location.latitude")) || -23.5505,
    Number(form.getValues("address.location.longitude")) || -46.6333,
  ] as [number, number];

  return <Map form={form} initialPosition={initialPosition} />;
}
