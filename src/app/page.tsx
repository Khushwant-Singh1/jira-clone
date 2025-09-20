"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/utils/auth/api/use-current";
import { useLogout } from "@/utils/auth/api/use-logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  return (<>
 <h1>Welcome to the Home page of jira</h1>
 <Button onClick={() => mutate()}>

Logout
 </Button>
  
  </>);
}
