import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export async function checkRole (role: Roles) {
    const { sessionClaims } = auth()
  
    return sessionClaims?.metadata.role === role;
  }