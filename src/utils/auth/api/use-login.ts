import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType, InferRequestType } from "hono";
import { useRouter } from "next/navigation";


type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;



export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      try {
        console.log("Making login request with data:", json);

        const response = await client.api.auth.login["$post"]({
          json
        });
        return await response.json();
      } catch (error) {
        console.error("Detailed login error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });

      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  return mutation;
};
