import { sessionRequest } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const SESSIONS = "session";

const useSessions = (opts?: object) => {
  const { data: sessions, ...baki } = useQuery({
    queryKey: [SESSIONS],
    queryFn: sessionRequest,
    ...opts,
  });

  return { sessions, ...baki };
};

export default useSessions;
