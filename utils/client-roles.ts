// utils/roles.ts

'use client'
import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";

export function checkRole (role: Roles) {
    const { sessionClaims } = auth()
  
    return sessionClaims?.metadata.role === role;
  }

// Client-side role check using a React hook
export const useRoleCheck = () => {
  const [role, setRole] = useState<Roles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/user-role"); 
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error("Failed to fetch user role", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, loading };
};
