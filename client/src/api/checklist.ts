// src/api/checklist.ts
export async function getChecklistsByTripSlug(tripSlug: string, token: string) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trips/slug/${tripSlug}/checklists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 

  
    if (!res.ok) {
      throw new Error("Failed to fetch checklists");
    }

    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  
    // return await res.json();
  }
  

export async function createChecklistByTripSlug(tripSlug: string, name: string, token: string) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trips/slug/${tripSlug}/checklists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
   

    if (!res.ok) {
      console.error("Checklist fetch failed with status:", res.status);

      throw new Error("Failed to create checklist");

    }
    console.log(res);
    const data = await res.json();
   
    return data;

  
  }


//get each checklist item 

export async function createChecklistItem(tripSlug: string, checklistId: string, token: string, label: string, assignedTo: string, checked: false) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    
    const res = await fetch(`${serverUrl}/api/trip/slug/${tripSlug}/checklist/${checklistId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({tripSlug: tripSlug, checklistId: checklistId, label: label, assignedTo: assignedTo, checked: checked}),
    });
   

    if (!res.ok) {
      throw new Error("Failed to create checklist");
    }
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;

  
  }

export async function getChecklistItem(tripSlug: string, checklistId: string, token: string) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trip/slug/${tripSlug}/checklist/${checklistId}`, { 
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 

  
    if (!res.ok) {
      throw new Error("Failed to fetch checklists");
    }

    console.log(res);
    const data = await res.json();
    console.log("working",data);
    return data;
  
  
  }
  
export async function deleteChecklistItem(tripSlug: string, checklistId: string, token: string, checklistItemId: string) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trip/slug/${tripSlug}/checklist/${checklistId}/item/${checklistItemId}`, {
     method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 

  
    if (!res.ok) {
      throw new Error("Failed to fetch checklists");
    }

    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  
  
  }