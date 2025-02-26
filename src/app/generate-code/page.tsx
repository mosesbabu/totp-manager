"use client";
import { useState } from "react";
import ViewOTP from "@/components/ViewOTP";
import GenerateCode from "@/components/GenerateCode";

interface Group {
  id: string;
  name: string;
}

interface TOTPCode {
  username: string;
  notes?: string;
  secretKey: string;
  groupId?: string;
}

export default function AddCodePage() {
  const [codes, setCodes] = useState<TOTPCode[]>([]);
  const [groups, setGroups] = useState<Group[]>([{ id: "1", name: "Default Group" }]);

  const handleCodeGenerated = (newCode: TOTPCode) => {
    setCodes([...codes, newCode]); 
  };

  return (
    <div className="mt-4">
      
     <GenerateCode groups={groups} onCodeGenerated={handleCodeGenerated} />

    
      {codes.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Generated OTP</h2>
          <ViewOTP codes={codes} groups={groups} />
        </div>
      )}
    </div>
  );
}
