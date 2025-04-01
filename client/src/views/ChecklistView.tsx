import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {  createChecklistItem, getChecklistItem, deleteChecklistItem } from "@/api/checklist"; 



type checklistItem = {
  label: string;
  assignedTo: string;
  checked: boolean;
  _id: string;


};


const ChecklistApp = () => {
  const { tripId } = useParams(); 
  const { checklistId } = useParams(); 
  const token = localStorage.getItem("token");
  const tripSlug= tripId;

  const [checklistItems, setChecklistItems] = useState<checklistItem[]>([]);
  // const [form, setForm] = useState({
  //   label: "",
  //   assignedTo: "",
  //   checked: false,
  // });

  const [newLabel, setNewLabel] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [checklistName, setChecklistName] = useState("");


    useEffect(() => {
      const fetchChecklistItems = async () => {
        try {
      const token = localStorage.getItem("token");
      const checklistItemsData = await getChecklistItem(tripSlug, checklistId, token);
        
  
  
          // Map backend response to frontend format
      console.log("heeeere", checklistItemsData.checklist.items);
      console.log("wohoo", checklistItemsData.checklist.name );
      setChecklistName(checklistItemsData.checklist.name);
      const formattedChecklistItems: checklistItem[] = checklistItemsData.checklist.items.map((checklist_item: any) => ({
            label: checklist_item.label,
            assignedTo: checklist_item.assignedTo, 
            checked: checklist_item.checked,
            _id: checklist_item._id
          }));
  
          setChecklistItems(formattedChecklistItems);
        } catch (err) {
          
          console.error("Failed to load trips:", err);
        }
      };
  
      fetchChecklistItems();
    }, []);

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

<div className="flex flex-col lg:flex-row p-8 gap-6">
      {/* Left: Checklist display */}
      
      <Card className="flex-1 bg-lime-100 rounded-lg shadow-sm p-6">
        <CardContent className="p-0">
        <h1 className="text-3xl font-bold text-green-800 mb-6">{localStorage.getItem("checkListName")}</h1>

          {checklistItems.length === 0 ? (
            <p className="text-gray-500">No items yet. Add something!</p>
          ) : (
            checklistItems.map(({ _id, label, checked, assignedTo }) => (
              <div key={_id} className="flex justify-between items-start mb-4">
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
      <Card className="w-full lg:w-1/3 bg-lime-200 rounded-lg shadow-sm p-6">
        <CardContent className="p-0">
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

  );
};

export default ChecklistApp;
