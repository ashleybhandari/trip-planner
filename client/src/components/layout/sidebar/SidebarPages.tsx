import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Plus } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

import { Checklist } from "@/types/Checklist";
import { generateRandomString } from "@/utils/generate-random-string";
import { MOCK_CHECKLISTS } from "@/mock-data/mock-checklists";
import { SIDEBAR_MAIN_PAGES } from "./sidebar-main-pages";

export function SidebarPages() {
  const [selected, setSelected] = useState("");
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const navigate = useNavigate();

  const handleAddChecklist = () => {
    const id = generateRandomString(5);

    setChecklists((prev) => [{ id, name: "new checklist" }, ...prev]);
    setSelected(id);
    navigate(`checklist/${id}`);
  };

  useEffect(() => {
    setChecklists(MOCK_CHECKLISTS);
  }, []);

  return (
    <div className="grow flex flex-col justify-between gap-4 my-2">
      <nav className="flex flex-col gap-2">
        {SIDEBAR_MAIN_PAGES.map(({ link, label }) => (
          <SidebarItem
            key={label}
            link={link}
            isSelected={selected === label}
            onClick={() => setSelected(label)}
          >
            {label}
          </SidebarItem>
        ))}
      </nav>
      <div>
        <div className="flex justify-between items-center m-3 text-on-secondary">
          <span className="text-sm">checklists</span>
          <button
            onClick={handleAddChecklist}
            className="cursor-pointer border-1 size-4 rounded flex justify-center items-center"
          >
            <Plus size={12} />
          </button>
        </div>
        <nav className="h-44 md:h-64 overflow-y-auto">
          {checklists.map(({ id, name }) => (
            <SidebarItem
              key={id}
              link={`checklist/${id}`}
              isSelected={selected === id}
              onClick={() => setSelected(id)}
              className="h-8 mb-1"
            >
              {name}
            </SidebarItem>
          ))}
        </nav>
      </div>
    </div>
  );
}
