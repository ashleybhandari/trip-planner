import { cn } from "@/utils/cn";
import { NavItem } from "@/components/navigation/NavItem";

type LogoutButtonProps = {
  className: string;
};

export default function LogoutButton({ className }: LogoutButtonProps) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const logoutUrl = `${serverUrl}/auth/logout`;
    window.location.href = logoutUrl;
  };

  return (
    <NavItem
      onClick={handleLogout}
      className={cn(
        "font-medium justify-center bg-secondary-container text-on-secondary-container hover:bg-error-container active:bg-error-container/90",
        className
      )}
    >
      Sign Out
    </NavItem>
  );
}
