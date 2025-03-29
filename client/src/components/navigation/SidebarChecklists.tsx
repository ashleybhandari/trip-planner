import { useContext } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { generateRandomString } from "@/utils/generate-random-string";
import { NavContext } from "@/Contexts";

export function SidebarChecklists() {
  const { selected, setSelected, checklists, setChecklists } =
    useContext(NavContext);
  const navigate = useNavigate();

  const handleAddChecklist = () => {
    const id = generateRandomString(5);

    setChecklists((prev) => [{ id, name: "new checklist" }, ...prev]);
    setSelected(id);
    navigate(`checklist/${id}`);
  };

  return (
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
  );
}
