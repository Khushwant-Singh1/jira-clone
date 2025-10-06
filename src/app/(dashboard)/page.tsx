import { getCurrent } from "@/utils/auth/actions";
import { redirect } from "next/navigation";
import { CreateWorkspaceForm } from "@/components/CreateWorkspaceForm";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <>
      <CreateWorkspaceForm  />
    </>
  );
}
