
export async function archiveTripsByTripId(tripId: string, token: string | null) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trips/${tripId}/archive-trip`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 

  
    if (!res.ok) {
      throw new Error("Failed to archive trip");
    }

    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  
    // return await res.json();
  }

