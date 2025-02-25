import React from "react";

interface Group {
  id: string;
  name: string;
}

interface GroupSelectorProps {
  groups: Group[];
  setSelectedGroup: (groupId: string) => void;
  createGroup: () => void;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({ groups, setSelectedGroup, createGroup }) => {
  return (
    <div className="mt-4">
      <label className="block">Select Group:</label>
      <select onChange={(e) => setSelectedGroup(e.target.value)} className="mt-2 border p-2 rounded">
        <option value="">None</option>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>{group.name}</option>
        ))}
      </select>
      <button onClick={createGroup} className="ml-2 px-4 py-2 bg-purple-500 text-white rounded">
        Create Group
      </button>
    </div>
  );
};

export default GroupSelector;
