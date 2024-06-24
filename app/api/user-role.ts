
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@clerk/nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionClaims } = auth();

  const userRole = sessionClaims?.role;

  return res.status(200).json({ role: userRole });
}
