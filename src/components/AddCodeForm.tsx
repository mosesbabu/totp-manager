import { useState } from "react";

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

interface AddCodeFormProps {
  groups: Group[];
  onCodeAdded: (newCode: TOTPCode) => void;
}

export default function AddCodeForm({ groups, onCodeAdded }: AddCodeFormProps) {
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !secretKey) {
      alert("Username and Secret Key are required!");
      return;
    }

    onCodeAdded({ username, notes, secretKey, groupId: selectedGroup || undefined });

    // Clear form fields
    setUsername("");
    setNotes("");
    setSecretKey("");
    setSelectedGroup("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2">Add New Code</h2>
      <input
        type="text"
        placeholder="Account Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="Secret Key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <select
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">No Group</option>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add Code
      </button>
    </form>
  );
}
