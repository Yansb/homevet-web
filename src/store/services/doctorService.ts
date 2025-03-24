import { api } from "./api";

interface Location {
  latitude: string;
  longitude: string;
}

interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  addressName: string;
  zipCode: string;
  complement?: string;
  location?: Location;
}

export interface createDoctorDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  radius: number;
  licenseNumber: string;
  isAttendingAddressSameAsAddress: boolean;
  attendingAddress?: Address;
  address: Address;
}

export async function createDoctor(data: createDoctorDTO) {
  const response = await api.post("/doctor", data);
  return response.data;
}
