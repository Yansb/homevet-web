import { api } from "./api";
import { GetLocationByCepResponse } from "./types/location.type";

export async function getLocationByCep(cep: string) {
  const response = await api.get<GetLocationByCepResponse>(`/location/${cep}`);
  return response.data;
}
