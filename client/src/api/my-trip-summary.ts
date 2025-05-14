
export const fetchSummary = async (tripSlug: string,token: string) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trip/slug/${tripSlug}/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
    if (!res.ok) throw new Error("Failed to fetch trip details");
    return res.json();
  };
  
export const updateSummaryField = async (
    tripSlug: string,
    field: string,
    value: string,
    token: string
  ) => { 
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trip/slug/${tripSlug}/summary`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tripSlug, field, value }),
    });
  
    if (!res.ok) throw new Error("Failed to update trip");
    return res.json();
  };


 
  