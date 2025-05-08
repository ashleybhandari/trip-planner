import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { acceptTripInvite } from "@/api/trip-invite"; // adjust path as needed

const InviteView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const acceptInvite = async () => {
      const params = new URLSearchParams(window.location.search);
      const inviteToken = params.get("token");
      const authToken = localStorage.getItem("token");
      if(!authToken)
      {
        return;
      }

      if (!inviteToken) {
        alert("Invalid or missing invite token.");
        return;
      }

      try {
        const res = await acceptTripInvite(authToken,inviteToken);
        // localStorage.setItem("token", res.token); // optional
        navigate("/dashboard");
      } catch (err) {
        console.error("Failed to accept invite:", err);
        alert("Failed to accept invite.");
      }
    };

    acceptInvite();
  }, [navigate]);

  return <p>Joining trip...</p>;
};

export default InviteView;
