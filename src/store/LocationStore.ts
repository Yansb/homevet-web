import { useQuery } from "@tanstack/react-query";
import { getLocationByCep } from "./services/locationService";

export function useLocation() {
  function useGetLocationByCepQuery(cep: string | undefined) {
    return useQuery({
      queryFn: () => getLocationByCep(cep!),
      queryKey: ["LocationByCep", cep],
      enabled: !!cep && cep.length === 8,
    });
  }

  return { useGetLocationByCepQuery };
}
