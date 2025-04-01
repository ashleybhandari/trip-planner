export async function getBudgetByTripSlug(token: string, tripSlug: string) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trip/slug/${tripSlug}/budget`, {
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
  
  export async function createBudgetItem(token: string, tripSlug: string, expense: string, date: string, amount: string, paidBy: string) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    
    const res = await  fetch(`${serverUrl}/api/trip/slug/${tripSlug}/budget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({tripSlug: tripSlug, expense: expense, date: date, amount: amount, paidBy: paidBy}),
    });
   

    if (!res.ok) {
      throw new Error("Failed to create checklist");
    }
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;

  
  }