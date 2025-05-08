export const acceptTripInvite = async (authToken: string, inviteToken: string) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
  
    const res = await fetch(`${serverUrl}/api/trip/invite`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
     
      credentials: "include",
      body: JSON.stringify({ inviteToken }),
    });
  
    if (!res.ok) {
      throw new Error("Failed to accept invite");
    }
  
    return res.json();
  };
  