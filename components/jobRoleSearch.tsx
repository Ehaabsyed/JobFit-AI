// components/JobRoleSearch.tsx

"use client";

import { useState } from "react";
import { jobRoles } from "@/app/data/jobRoles";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function JobRoleSearch({ value, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const filtered = jobRoles.filter((role) =>
    role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full mb-4">
      
      <input
        type="text"
        placeholder="Search job role..."
        value={value}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setShow(true);
        }}
        onFocus={() => setShow(true)}
        className="w-full p-3 rounded-lg bg-[#1e1e1e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e11021]"
      />

      {show && query && (
        <div className="absolute z-50 w-full bg-[#1e1e1e] border border-gray-700 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
          
          {filtered.length > 0 ? (
            filtered.slice(0, 10).map((role, index) => (
              <div
                key={index}
                onClick={() => {
                  onChange(role);
                  setQuery(role);
                  setShow(false);
                }}
                className="px-4 py-2 text-white cursor-pointer hover:bg-[#e11021]/20"
              >
                {role}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400">
              No results found
            </div>
          )}

        </div>
      )}
    </div>
  );
}