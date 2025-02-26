import { useState, useEffect } from "react";

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

interface GenerateCodeProps {
  groups: Group[];
  onCodeGenerated: (newCode: TOTPCode) => void;
}

// Predefined array of random secret keys
const SECRET_KEYS = [
  "JBSWY3DPEHPK3PXP",
  "GAXGK3TDN5SX3LJO",
  "KVKFKRCPNZQUYMLX",
  "MBZGK3TDN5SX3PQP",
  "OZXGK3TDN5ZX3LJY",
];

export default function GenerateCode({ groups, onCodeGenerated }: GenerateCodeProps) {
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(""); 
  const [generatedKey, setGeneratedKey] = useState(""); 


  useEffect(() => {
    generateSecretKey();
  }, []);

  // Function to randomly select a secret key
  const generateSecretKey = () => {
    const randomKey = SECRET_KEYS[Math.floor(Math.random() * SECRET_KEYS.length)];
    setGeneratedKey(randomKey);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      alert("Username is required!");
      return;
    }

    const newCode: TOTPCode = {
      username,
      notes,
      secretKey: generatedKey, // Use auto-generated key
      groupId: selectedGroup || undefined, // Allow no group
    };

    // Call the parent function to handle the OTP
    onCodeGenerated(newCode);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2">Generate New OTP</h2>
      <input
        type="text"
        placeholder="Account Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        placeholder="Notes (Optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <select
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">No Group (Optional)</option>
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>

      {/* Auto-generated Secret Key */}
      <input
        type="text"
        value={generatedKey}
        readOnly
        className="w-full p-2 border rounded bg-gray-100 text-gray-600 mb-2"
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Generate OTP
      </button>
    </form>
  );
}
