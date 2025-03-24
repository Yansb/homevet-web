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
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router";
import { useStores } from "@/store";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { ChevronRight } from "lucide-react";
import { signUpSchema, SignUpFormData } from "./schema";
import { DoctorSignupFirstStep } from "./steps/DoctorSignUpFirstStep";
import { DoctorSignUpThirdStep } from "./steps/DoctorSignUpThirdStep";
import { DoctorSignUpSecondStep } from "./steps/DoctorSignUpSecondStep";
import { createDoctorDTO } from "@/store/services/doctorService";

export function DoctorSignUpCard() {
  const {
    locationStore: { useGetLocationByCepQuery },
    doctorStore: { createDoctorMutation },
  } = useStores();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [isAttendingLocationSet, setIsAttendingLocationSet] = useState(false);

  const navigate = useNavigate();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      radius: 1,
    },
  });

  const cep = form.watch("address.zipCode");
  const attendingCep = form.watch("attendingAddress.zipCode");
  const debouncedCep = useDebounce(cep?.replace(/\D/g, "") || "", 500);
  const debouncedAttendingCep = useDebounce(
    attendingCep?.replace(/\D/g, "") || "",
    500,
  );

  const { data: locationData } = useGetLocationByCepQuery(debouncedCep);
  const { data: attendingLocationData } = useGetLocationByCepQuery(
    debouncedAttendingCep,
  );

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

    if (attendingLocationData) {
      form.setValue(
        "attendingAddress.street",
        attendingLocationData.street || "",
      );
      form.setValue("attendingAddress.city", attendingLocationData.city);
      form.setValue("attendingAddress.state", attendingLocationData.state);
      if (attendingLocationData.location?.coordinates) {
        form.setValue("address.location", {
          latitude: attendingLocationData.location.coordinates.latitude || "",
          longitude: attendingLocationData.location.coordinates.longitude || "",
        });
      }
      setIsAttendingLocationSet(true);
    }
  }, [locationData, attendingLocationData]);

  const validateStep = async (step: number) => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = await form.trigger([
          "email",
          "password",
          "passwordConfirm",
          "firstName",
          "lastName",
          "phone",
        ]);
        break;
      case 2:
        isValid = await form.trigger([
          "address.street",
          "address.number",
          "address.city",
          "address.state",
          "address.zipCode",
          "attendingAddress.street",
          "attendingAddress.number",
          "attendingAddress.city",
          "attendingAddress.state",
          "attendingAddress.zipCode",
        ]);
        break;
      case 3:
        isValid = await form.trigger(["licenseNumber"]);
        break;
    }

    return isValid;
  };

  async function onSubmit(data: SignUpFormData) {
    const cleanedPhone = `+55${data.phone.replace(/\D/g, "")}`;
    const doctorData: createDoctorDTO = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: cleanedPhone,
      address: data.address,
      radius: data.radius,
      attendingAddress: data.attendingAddress,
      licenseNumber: data.licenseNumber,
      isAttendingAddressSameAsAddress: data.isAttendingAddressSameAsAddress,
    };

    createDoctorMutation.mutate(doctorData, {
      onSuccess: () => navigate("/login"),
    });
  }

  const handleNextStep = async () => {
    const isValid = await validateStep(currentStep);
    console.log(currentStep);
    if (isValid) {
      if (currentStep === 3) {
        form.handleSubmit(onSubmit)();
      } else {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Veterinarios</CardTitle>
        <CardDescription>Crie aqui sua conta</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="mb-6 grid grid-cols-1 gap-4">
            {currentStep === 1 && (
              <DoctorSignupFirstStep
                form={form}
                isLocationSet={isLocationSet}
              />
            )}
            {currentStep === 2 && (
              <DoctorSignUpSecondStep
                form={form}
                isLocationSet={isLocationSet}
                isAttendingLocationSet={isAttendingLocationSet}
              />
            )}
            {currentStep === 3 && <DoctorSignUpThirdStep form={form} />}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                currentStep === 1
                  ? navigate("/login")
                  : setCurrentStep((prevStep) => prevStep - 1)
              }
            >
              Voltar
            </Button>
            <Button type="button" onClick={handleNextStep}>
              {currentStep === 3 ? "Cadastrar" : "Continuar"}{" "}
              {currentStep !== 3 && <ChevronRight />}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
