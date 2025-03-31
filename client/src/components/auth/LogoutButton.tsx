import { NavItem } from "@/components/navigation/NavItem";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const logoutUrl = `${serverUrl}/logout`;
    window.location.href = logoutUrl;
  };

  return (
    <NavItem
      onClick={handleLogout}
      className="font-medium justify-center bg-secondary-container text-on-secondary-container hover:bg-error-container active:bg-error-container/90"
    >
      Sign Out
    </NavItem>
  );
}
