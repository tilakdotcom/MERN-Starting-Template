import { userRequest } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


export const AUTH = "auth";

export const useAuth = (opts? : object ) =>{
  const {
    data:user,
    ...rest
  } = useQuery({
    queryKey: [AUTH],
    queryFn: userRequest,
    staleTime:Infinity,
    refetchInterval: 2 * 60 * 1000, 
    ...opts,
  })
  return {
    user,
   ...rest,
  };
}