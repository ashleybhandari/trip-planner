export async function deleteTrip(tripSlug: string, token:string) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trip/slug/${tripSlug}`, {
     method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },

    }); 

  
    if (!res.ok) {
      throw new Error("Failed to delete trip");
    }

    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  
  
  }

  export async function endTrip(tripSlug: string, token:string) {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverUrl}/api/trip/slug/${tripSlug}/change-status`, {
     method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
     
    }); 

  
    if (!res.ok) {
      throw new Error("Failed to update trip status");
    }

    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
  
  
  }



export type TripResponse = {
    tripName: string;
    destinations: string;
    users: { name?: string; email?: string }[];
    tripSlug: string;
    status: boolean;
  };
  
export const fetchTripsFromServer = async (): Promise<{
    activeTrips: TripResponse[];
    inactiveTrips: TripResponse[];
  }> => {
    const token = localStorage.getItem("token");
    const serverUrl = import.meta.env.VITE_SERVER_URL;
  
    const res = await fetch(`${serverUrl}/api/trips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch trips");
    }
  
    const data: TripResponse[] = await res.json();
  
    const activeTrips: TripResponse[] = [];
    const inactiveTrips: TripResponse[] = [];
  
    data.forEach((trip) => {
      if (trip.status === false) {
        inactiveTrips.push(trip);
      } else {
        activeTrips.push(trip);
      }
    });
  
    return { activeTrips, inactiveTrips };
  };
  
