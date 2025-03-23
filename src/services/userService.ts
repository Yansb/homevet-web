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

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
}

export async function createUser(data: CreateUserDTO) {
  const response = await api.post("/user", data);
  return response.data;
}
