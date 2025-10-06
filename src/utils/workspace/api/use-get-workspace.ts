import { useQuery } from "@tanstack/react-query";

import {client} from "@/lib/rpc"


export const useGetWorkspace = () => {
    const query = useQuery({
        queryKey: ["workspace"],
        queryFn: async () => {
            const response = await client.api.workspace.$get();
            if (!response.ok) {
                throw new Error("failed to fetch workspace")
            }

            const { data } = await response.json();

            return data;
        }
    });

    return query;
};