"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ViewOTP from "@/components/ViewOTP";

interface Group {
  id: string;
  name: string;
}

interface TOTPCode {
  username: string;
  notes: string;
  secretKey: string;
  groupId?: string;
}

export default function Dashboard() {
  const [codes, setCodes] = useState<TOTPCode[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    // Preload with a default group (if needed)
    setGroups([{ id: "1", name: "Default Group" }]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Button to navigate to Add Code page */}
      <Link href="/generate-code">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Code</button>
      </Link>

      {/* Display Groups */}
      <h2 className="text-xl font-semibold mt-4">Groups</h2>
      {groups.length === 0 ? (
        <p>No groups available. Add codes to create groups.</p>
      ) : (
        <ul className="list-disc pl-6">
          {groups.map((group) => (
            <li key={group.id} className="mt-2">
              <strong>{group.name}</strong>
              {/* Show OTPs belonging to this group */}
              <ViewOTP codes={codes.filter((code) => code.groupId === group.id)} groups={groups} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
