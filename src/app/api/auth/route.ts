import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  const group = await prisma.codeGroup.create({ data: { name, userId } });

  return Response.json(group);
}
