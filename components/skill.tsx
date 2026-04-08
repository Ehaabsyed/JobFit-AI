"use client";

export default function SkillBtn({ label = "Skill 1" }: { label?: string }) {
  return (
    <button className="px-2 py-1.5 h-6 text-[15px] md:text-[17px] rounded-md bg-red-500 text-red-200 font-medium text-md flex justify-center items-center transition-all duration-300 hover:shadow-md cursor-pointer hover:shadow-red-500/50">
      {label}
    </button>
  );
}