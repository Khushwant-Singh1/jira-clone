import { DottedSeparator } from "../dotted-separator";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { useState } from "react";
import { Input } from "../ui/input";
export const SignInCard = () => {
  const [email, setEmail] = useState("");
  
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" disabled={false} />
        </form>
      </CardContent>
    </Card>
  );
};
