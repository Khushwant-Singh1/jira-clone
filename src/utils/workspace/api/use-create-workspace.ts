import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.workspace["$post"]>;
type RequestType = InferRequestType<typeof client.api.workspace["$post"]>;



export const useCreationWorkspace = () => {

  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      try {
        console.log("Making workspace creation request with data:", form);

        const response = await client.api.workspace["$post"]({
          form
        });
        return await response.json();
      } catch (error) {
        console.error("Detailed login error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Workspace created successfully");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      console.log("Workspace created successfully:", data);
    },
    onError: (error) => {
      toast.error("Workspace creation failed");
      console.error("Workspace creation error:", error);
    },
  });

  return mutation;
};
