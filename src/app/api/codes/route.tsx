import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, secretKey, groupId, expiresAt } = await req.json();

    console.log("Received payload:", { username, secretKey, groupId, expiresAt });

   
    if (groupId) {
      const group = await prisma.group.findUnique({
        where: { id: groupId },
      });

      if (!group) {
        console.error("Group not found for ID:", groupId);
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
      }
    }

    // Save the TOTP Code
    const newCode = await prisma.tOTPCode.create({
      data: {
        username,
        secretKey,
        expiresAt: new Date(expiresAt),
        group: groupId ? { connect: { id: groupId } } : undefined,
      },
    });

    console.log("Code created successfully:", newCode);
    return NextResponse.json(newCode, { status: 201 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Error saving TOTP Code", details: error }, { status: 500 });
  }
}


export async function GET() {
    try {
      const codes = await prisma.tOTPCode.findMany({
        include: {
          group: true, // Include related group details if needed
        },
      });
  
      return NextResponse.json(codes, { status: 200 });
    } catch (error) {
      console.error("Error fetching OTP codes:", error);
      return NextResponse.json({ error: "Error retrieving OTP codes", details: error }, { status: 500 });
    }
  }
  