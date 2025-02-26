import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import speakeasy from "speakeasy";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { codeId } = req.query;
  if (!codeId) return res.status(400).json({ error: "Code ID is required" });

  const code = await prisma.code.findUnique({ where: { id: String(codeId) } });
  if (!code) return res.status(404).json({ error: "Code not found" });

  const totp = speakeasy.totp({
    secret: code.secretKey,
    encoding: "base32",
  });

  return res.status(200).json({ totp });
}
