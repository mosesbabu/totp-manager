"use client"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { useState, useEffect } from "react";
import GroupSelector from "@/components/GroupSelector";
import OTPDisplay from "@/components/OTPDisplay";
import AddCodeForm from "@/components/AddCodeForm";
import ViewOTP from "@/components/ViewOTP";
interface Group {
  id: string;
  name: string;
}
interface TOTPCode {
  username: string;
  notes: string;
  secret: string;
  groupId?: string;
}

export default function Home() {
  const [codes, setCodes] = useState<TOTPCode[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  useEffect(() => {
    setGroups([{ id: "1", name: "Default Group" }]); 
  }, []);
  const handleAddCode = (newCode: TOTPCode) => {
    setCodes([...codes, newCode]);
  };
  const handleCreateGroup = (groupName: string) => {
    const newGroup: Group = { id: String(groups.length + 1), name: groupName };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };
  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <h1 className="text-2xl font-bold mt-4">TOTP Manager</h1>

          <GroupSelector 
            groups={groups} 
            setSelectedGroup={setSelectedGroup} 
            createGroup={handleCreateGroup} 
          />

          <AddCodeForm groups={groups} onCodeAdded={handleAddCode} />

          <ViewOTP codes={codes} groups={groups} />

        </SignedIn>
      </div>
    </ClerkProvider>
  );
}
