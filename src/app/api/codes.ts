import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const codes = await prisma.tOTPCode.findMany({ include: { group: true } });
      res.status(200).json(codes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch codes" });
    }
  } 
  else if (req.method === "POST") {
    const { username, secretKey, notes, groupId } = req.body;
    try {
      const newCode = await prisma.tOTPCode.create({
        data: {
          username,
          secretKey,
          notes,
          groupId,
          shareableLink: `/share/${nanoid(10)}`,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
      res.status(201).json(newCode);
    } catch (error) {
      res.status(500).json({ error: "Failed to create code" });
    }
  }
}
