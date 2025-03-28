import { useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { Plus } from "lucide-react";
import { CHECKLISTS } from "@/mock-data/checklists";

export function SidebarChecklists() {
  const [checklists, setChecklists] = useState(CHECKLISTS);

  const handleAddChecklist = () => {
    setChecklists((prev) => [...prev, { id: "test", name: "new checklist" }]);
  };

  return (
    <div>
      <div className="flex justify-between items-center m-2 mt-10 text-on-secondary">
        <span className="text-sm">checklists</span>
        <button
          onClick={handleAddChecklist}
          className="cursor-pointer border-1 size-4 rounded flex justify-center items-center"
        >
          <Plus size={12} />
        </button>
      </div>
      <div>
        {checklists.map(({ id, name }) => (
          <SidebarItem key={id} link="checklist" className="h-8">
            {name}
          </SidebarItem>
        ))}
      </div>
    </div>
  );
}
