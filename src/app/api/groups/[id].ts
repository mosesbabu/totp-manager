import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const auth = getAuth(req);
  if (!auth.userId) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "PUT") {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Group name is required" });

    try {
      const updatedGroup = await prisma.group.update({
        where: { id: String(id) },
        data: { name },
      });
      return res.json(updatedGroup);
    } catch (error) {
      return res.status(500).json({ error: "Error updating group" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.group.delete({ where: { id: String(id) } });
      return res.json({ message: "Group deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting group" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
