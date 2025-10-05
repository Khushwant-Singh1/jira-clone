import { SignInCard } from "@/components/auth/signincard";
import { getCurrent } from "@/utils/auth/actions";
import { redirect } from "next/navigation";
const SignInPage =  async () => {
  const user = await getCurrent();
  if(user){
    redirect("/")
  }
  return (
    <SignInCard/>
  );
};

export default SignInPage;
