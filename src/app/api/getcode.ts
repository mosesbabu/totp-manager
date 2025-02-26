import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse)  {
  if (req.method === "GET") {
    const { codeId } = req.query;
    try {
      const code = await prisma.tOTPCode.findUnique({
        where: { shareableLink: `/share/${codeId}` },
      });

      if (!code) return res.status(404).json({ error: "Code not found" });

      res.status(200).json(code);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch code" });
    }
  }
}
