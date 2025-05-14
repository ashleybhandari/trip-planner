
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Plus } from "lucide-react";
import { NavItem } from "./NavItem";
import { generateRandomString } from "@/utils/generate-random-string";
import { NavContext } from "@/Contexts";
import {  getChecklistsByTripSlug, createChecklistByTripSlug } from "@/api/checklist"; // ✅
import { generate, count } from "random-words";

// "checklists" header with button to create a checklist, followed by a list of
// selectable checklists.

type Checklist= {
  name: string;
  id: string

};

export function NavChecklists() {
  const { selected, setSelected, checklists, setChecklists } =
    useContext(NavContext);
  const navigate = useNavigate();
  const { tripSlug } = useParams(); 


  useEffect(() => {
    const fetchChecklists = async () => {
      if (!tripSlug) return;
      try {
        const token = localStorage.getItem("token")!;
        const checklistData = await getChecklistsByTripSlug(tripSlug, token);
        const formattedChecklists: Checklist[] = checklistData.map((checklist: any) => ({
          name: checklist.name,
          id: checklist._id
        }));
        setChecklists(formattedChecklists); // ✅ Populate sidebar
      } catch (err) {
        console.error("Error fetching checklists:", err);
      }
    };

    fetchChecklists();
  }, [tripSlug]);


  const handleAddChecklist = async() => {
    if (!tripSlug) return;
    try {
    const token = localStorage.getItem("token")!;
    const noun = generate();
    const newChecklistData = await createChecklistByTripSlug(tripSlug, noun, token);
    localStorage.setItem("checkListName", noun);

    
    const formattedChecklist: Checklist = {
      name: noun,
      id: newChecklistData._id,
    };
    
    console.log(formattedChecklist.id);

    setChecklists((prev) => [formattedChecklist, ...prev]);
    setSelected(formattedChecklist.id);
    navigate(`checklist/${formattedChecklist.id}`);}
    catch(err)
    {
      console.error("Failed to create checklist:", err);
    }
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
            onClick={() => {setSelected(id); localStorage.setItem("checkListName", name);}}
            className="h-8 mb-1"
          >
            {name}
          </NavItem>
        ))}
      </nav>
    </div>
  );
}
