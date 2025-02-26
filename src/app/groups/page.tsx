"use client"
import { useEffect, useState } from "react";
import CreateGroup from "@/components/CreateGroup"; 
interface Group {
  id: string;
  name: string;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch("api/groups");
        if (!res.ok) throw new Error("Failed to fetch groups");

        const data = await res.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }

    fetchGroups();
  }, []);

  
  const handleGroupCreated = async (newGroup: Group) => {
    setGroups([...groups, newGroup]);
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Groups</h1>

     
      <CreateGroup onGroupCreated={handleGroupCreated} />

     
      <ul>
        {groups.map((group) => (
          <li key={group.id} className="border p-2 my-2">
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
