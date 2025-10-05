import { UserButton } from "@/components/auth/UserButton";
import { getCurrent } from "@/utils/auth/actions";
import { redirect } from "next/navigation";


export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <>
      <h1>Welcome to the Home page of jira</h1>
      <UserButton />
    </>
  );
}
