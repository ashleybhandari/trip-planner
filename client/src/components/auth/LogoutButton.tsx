import { Button } from "@/components/ui/button";

export default function LogoutButton() { 
   
    
  const handleLogout = () => {
    localStorage.removeItem("token");
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const logoutUrl = `${serverUrl}/logout`;
    window.location.href = logoutUrl;
  };

  return (
    <Button onClick={handleLogout}>
      Sign Out 
    </Button>
  );
}
 