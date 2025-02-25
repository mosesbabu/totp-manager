import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, notes, secretKey, groupId } = req.body;

  if (!username || !secretKey) {
    return res.status(400).json({ error: "Username and Secret Key are required" });
  }

  const newCode = await prisma.tOTPCode.create({
    data: { username, notes, secretKey, groupId },
  });

  return res.status(201).json(newCode);
}
