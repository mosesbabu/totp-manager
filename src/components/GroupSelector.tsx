import React from "react";



interface GroupSelectorProps {
  groups: { id: string; name: string }[];
  setSelectedGroup: (groupId: string) => void;
  createGroup: (groupName: string) => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({ groups, setSelectedGroup, createGroup }) => {
  return (
    <div className="mt-4">
      <label className="block">Select Group:</label>
      <select
        id="group"
        onChange={(e) => setSelectedGroup(e.target.value)} 
        className="border p-2 rounded"
      >
        <option value="">All Groups</option>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
      <button onClick={() => createGroup(prompt("Enter group name") || "")}>Create Group</button>
    </div>
  );
};

export default GroupSelector;
