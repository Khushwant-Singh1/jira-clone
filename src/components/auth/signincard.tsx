import { DottedSeparator } from "../dotted-separator";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Link from "next/link";
<<<<<<< HEAD
import {loginSchema} from "@/utils/schema";
=======
import { loginSchema } from "@/utils/schema";
>>>>>>> 7af2f2a (feat: refactor authentication flow; implement registration functionality and update schemas for login and registration)
import { useLogin } from "@/utils/auth/api/use-login";


export const SignInCard = () => {

  const {mutate} = useLogin()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({
      json: 
        values, // Using email as userId for now, adjust as needed
    
    });
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter Email Address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button disabled={false} size={"lg"} className="w-full">Sign In</Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-4">
        <Button variant={"secondary"} size={"lg"} className="w-full" disabled={false}> <FcGoogle className="mr-2 size-5" /> Sign In with Google</Button>
        <Button variant={"secondary"} size={"lg"} className="w-full" disabled={false}><FaGithub className="mr-2 size-5" />Sign In with GitHub</Button>
      </CardContent>
<div className="px-7">
  <DottedSeparator/>
  </div>

  <CardContent className="p-7 flex items-center justify-center">
    <p>
      Don't have an account?{" "}
      <Link href="/sign-up" >
      <span className="text-blue-500 hover:underline">
        SignUp
        </span>
      </Link>
      </p>
  </CardContent>

    </Card>
  );
};
