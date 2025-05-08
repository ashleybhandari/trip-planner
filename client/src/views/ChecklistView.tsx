import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {  createChecklistItem, getChecklistItem, deleteChecklistItem } from "@/api/checklist"; 
import { io, Socket } from "socket.io-client";
const socket: Socket = io("http://localhost:3000", {
  withCredentials: true,
});

type checklistItem = {
  label: string;
  assignedTo: string;
  checked: boolean;
  _id: string;


};


const ChecklistApp = () => {
  const { tripSlug } = useParams(); 
  const { checklistId } = useParams(); 
  const token = localStorage.getItem("token");

  const [checklistItems, setChecklistItems] = useState<checklistItem[]>([]);
  // const [form, setForm] = useState({
  //   label: "",
  //   assignedTo: "",
  //   checked: false,
  // });

  const [newLabel, setNewLabel] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [checklistName, setChecklistName] = useState("");

  const fetchChecklistItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const checklistItemsData = await getChecklistItem(tripSlug, checklistId, token);

      setChecklistName(checklistItemsData.checklist.name);
      const formattedChecklistItems: checklistItem[] = checklistItemsData.checklist.items.map((checklist_item: any) => ({
        label: checklist_item.label,
        assignedTo: checklist_item.assignedTo,
        checked: checklist_item.checked,
        _id: checklist_item._id
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
            console.log("Received socket update, refetching checklist...");
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
    
    

    const toggleCheck = (_id: string) => {
      setChecklistItems((prev) =>
        prev.map((item) =>
          item._id === _id ? { ...item, checked: !item.checked } : item
        )
      ); 

      
    };
  const deleteItem = async (_id: string) => {
    try {
      await deleteChecklistItem(tripSlug, checklistId, token, _id);
      setChecklistItems((prev) => prev.filter((item) => item._id !== _id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const addItem =async () => {
   
  
    const checked= false;
    const newChecklistItemData = await createChecklistItem(tripSlug, checklistId, token, newLabel, newPerson, checked);
    
    const formattedChecklist: checklistItem = {
      label: newChecklistItemData.label,
      assignedTo: newChecklistItemData.assignedTo,
      checked: newChecklistItemData.checked,
      _id: newChecklistItemData._id

    }; 

    setChecklistItems((prev) => [...prev, formattedChecklist]);
    console.log(formattedChecklist);
    setNewLabel("");
    setNewPerson("");


  };

  return (

    <div className="p-8">
    {/* Checklist Title */}
    <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
      {localStorage.getItem("checkListName")}
    </h1>
    

<div className="flex flex-col lg:flex-row p-8 gap-6">

      {/* Left: Checklist display */}
      
      <Card className="bg-lime-200 w-2/3 shadow-none border-none p-6 h-[400px] ">
        <CardContent className="flex-1 overflow-auto p-4">
       

          {checklistItems.length === 0 ? (
            <p className="text-gray-500">No items yet. Add something!</p>
          ) : (
            checklistItems.map(({ _id, label, checked, assignedTo }) => (
              <div key={_id} className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleCheck(_id)}
                  />
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-gray-600">
                      Assigned to: {assignedTo}
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => deleteItem(_id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Right: New Item Form */}
      <Card className="w-1/2 bg-transparent  shadow-md border-none h-fit">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">New Item</h2>

          <label className="block mb-1 font-medium text-sm">Label:</label>
          <Input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="mb-3"
          />

          <label className="block mb-1 font-medium text-sm">Assign To:</label>
          <Input
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            className="mb-4"
          />

          <Button
            className="w-full bg-green-800 text-white hover:bg-green-900"
            onClick={addItem}
          >
            Add to List
          </Button>
        </CardContent>
      </Card>
    </div>
    </div>

  );
};

export default ChecklistApp;
