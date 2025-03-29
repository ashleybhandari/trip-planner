import { useContext } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { NavItem } from "./NavItem";
import { generateRandomString } from "@/utils/generate-random-string";
import { NavContext } from "@/Contexts";

// "checklists" header with button to create a checklist, followed by a list of
// selectable checklists.
export function NavChecklists() {
  const { selected, setSelected, checklists, setChecklists } =
    useContext(NavContext);
  const navigate = useNavigate();

  const handleAddChecklist = () => {
    const id = generateRandomString(5);

    // create new checklist and select it in the nav menu
    setChecklists((prev) => [{ id, name: "new checklist" }, ...prev]);
    setSelected(id);

    // navigate to the new checklist
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
          <NavItem
            key={id}
            link={`checklist/${id}`}
            isSelected={selected === id}
            onClick={() => setSelected(id)}
            className="h-8 mb-1"
          >
            {name}
          </NavItem>
        ))}
      </nav>
    </div>
  );
}
