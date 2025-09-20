"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "../dotted-separator";

import { useLogout } from "@/utils/auth/api/use-logout";
import { useCurrent } from "@/utils/auth/api/use-current";
import { Loader } from "lucide-react";


export const UserButton =()=>{

    const {  data : user, isLoading} = useCurrent();

if (!isLoading){

   
 return(

        <div className="size-10 rounded-full flex item-center justify-center  bg-neutral-200 border-neutral-300">
         <Loader className="size-4 animate-spin  text-muted-foreground"/>
        </div>
    )
}
if(!user){
    return  null;
}

const { name, email } = user as { name?: string; email: string };
const fallbackInitial =
  name && typeof name === "string" && name.length > 0
    ? name.charAt(0).toUpperCase()
    : email && typeof email === "string" && email.length > 0
    ? email.charAt(0).toUpperCase()
    : "U";
return (
  <Avatar>
    <AvatarFallback>
      {fallbackInitial}
    </AvatarFallback>
  </Avatar>
);
}



