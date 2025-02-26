"use client"
import { useState } from "react";
import GroupSelector from "@/components/GroupSelector";

export default function ManageGroups() {
  const [groups, setGroups] = useState([{ id: "1", name: "Default Group" }]);

  return (
    <div>
      <h1 className="text-xl font-bold">Manage Groups</h1>
      <GroupSelector groups={groups} setSelectedGroup={() => {}} createGroup={() => {}} />
    </div>
  );
}
