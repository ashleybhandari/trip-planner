import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { io, Socket } from "socket.io-client";

import {
  createChecklistItem,
  getChecklistItem,
  deleteChecklistItem,
} from "@/api/checklist";
import AddChecklistItemForm from "@/components/checklist/AddChecklistItemForm";
import Item from "@/components/checklist/Item";
import EditableText from "@/components/ui/EditableText";
import PageSection from "@/components/ui/PageSection";

import { addChecklistItemFormSchema } from "@/components/checklist/add-checklist-item-form-schema";
import { ChecklistItem } from "@/types/ChecklistItem";
import { MOCK_USERS } from "@/mock/mock-expenses";

const socket: Socket = io("http://localhost:3000", {
  withCredentials: true,
});

const ChecklistApp = () => {
  const { tripSlug } = useParams(); 
  const { checklistId } = useParams(); 
  const token = localStorage.getItem("token");

  const [checklistName, setChecklistName] = useState(
    localStorage.getItem("checkListName") ?? "My checklist"
  );
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);

  const fetchChecklistItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const checklistItemsData = await getChecklistItem(
        tripSlug,
        checklistId,
        token
      );

      setChecklistName(checklistItemsData.checklist.name);
      const formattedChecklistItems: ChecklistItem[] =
        checklistItemsData.checklist.items.map((checklist_item: any) => ({
          _id: checklist_item._id,
          label: checklist_item.label,
          assignedTo: checklist_item.assignedTo,
          checked: checklist_item.checked,
        }));

      setChecklistItems(formattedChecklistItems);
    } catch (err) {
      console.error("Failed to load checklist:", err);
    }
  };

  useEffect(() => {
    if (tripSlug && checklistId) {
      socket.emit("join-trip", tripSlug);

      const handleChecklistUpdate = (data: any) => {
        if (
          data.checklistId.toString() === checklistId.toString() &&
          data.tripSlug === tripSlug
        ) {
          fetchChecklistItems();
        }
      };

      socket.on("checklist-updated", handleChecklistUpdate);

      fetchChecklistItems();
      return () => {
        socket.off("checklist-updated", handleChecklistUpdate);
      };
    }
  }, [tripSlug, checklistId]);

  const toggleCheck = async (_id: string) => {
    try {
      setChecklistItems((prev) =>
        prev.map((item) =>
          item._id === _id ? { ...item, checked: !item.checked } : item
        )
      );
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const deleteItem = async (_id: string) => {
    try {
      await deleteChecklistItem(tripSlug, checklistId, token, _id);
      setChecklistItems((prev) => prev.filter((item) => item._id !== _id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleAddItem = async (
    values: z.infer<typeof addChecklistItemFormSchema>
  ) => {
    const data = await createChecklistItem(
      tripSlug,
      checklistId,
      token,
      values.label,
      values.assignedTo,
      false
    );

    const newItem: ChecklistItem = {
      _id: data._id,
      label: values.label,
      assignedTo: values.assignedTo,
      checked: false,
    };

    setChecklistItems((prev) => [...prev, newItem]);
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-8">
      <EditableText className="mx-3 mt-5 mb-4 text-3xl text-center font-bold text-primary">
        {checklistName}
      </EditableText>
      <AddChecklistItemForm
        collaborators={Object.values(MOCK_USERS)}
        onSubmit={handleAddItem}
      />
      <PageSection className="grow flex flex-col gap-3 justify-start p-5 w-full">
        {checklistItems.length > 0 ? (
          checklistItems.map((item) => (
            <Item
              key={item._id}
              assignedTo={item.assignedTo}
              checked={item.checked}
              onCheck={() => toggleCheck(item._id)}
              onDelete={() => deleteItem(item._id)}
            >
              {item.label}
            </Item>
          ))
        ) : (
          <div className="m-auto">Nothing yet!</div>
        )}
      </PageSection>
    </div>
  );
};

export default ChecklistApp;
