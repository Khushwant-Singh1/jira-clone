import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      try {
        console.log("Making logout request");

        const response = await client.api.auth.logout["$post"]();
        return await response.json();
      } catch (error) {
        console.error("Detailed login error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Logout successful");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
      console.log("Logout successful:");
    },
    onError: (error) => {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    },
  });

  return mutation;
};
