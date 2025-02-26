import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server"; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const json = await req.json();
    console.log("Received JSON:", json);
    
    const { name } = json;
    if (!name) return NextResponse.json({ error: "Group name is required" }, { status: 400 });
    
    const group = await prisma.group.create({
      data: { name, ownerId: userId },
    });
    
    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    // Use safer error logging that won't cause circular reference issues
    console.error("POST Error:", error instanceof Error ? error.message : "Unknown error");
    
    // Check if it's a Prisma-specific error
    if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
      // Handle specific Prisma errors
      return NextResponse.json({ error: "Database error occurred" }, { status: 500 });
    }
    
    return NextResponse.json({ error: "Error creating group" }, { status: 500 });
  }
}
export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch all groups owned by the authenticated user
    const groups = await prisma.group.findMany({
      where: { ownerId: userId },
    });

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error instanceof Error ? error.message : "Unknown error");

    if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
      return NextResponse.json({ error: "Database error occurred" }, { status: 500 });
    }

    return NextResponse.json({ error: "Error fetching groups" }, { status: 500 });
  }
}