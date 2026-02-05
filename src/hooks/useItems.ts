import { useQuery } from "@tanstack/react-query";
import type { Item } from "../types";
import { api } from "./apiConfig";

const queryItems = (): Promise<Item[]> => {
  return api.get("v1/demoItems/actives").then((response) => response.data);
};

function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: queryItems,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}
export default useItems;
