import { SignUpCard } from "@/components/auth/signupcard";
import { getCurrent } from "@/utils/auth/actions";
import { redirect } from "next/navigation";
const SignUpPage = async () => {
  const user = await getCurrent();
  if (user) redirect("/");
  return <SignUpCard />;
};

export default SignUpPage;