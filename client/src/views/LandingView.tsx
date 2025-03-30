import { Button } from "@/components/ui/button";
import LandingCard from "@/components/landing/LandingCard";
import { useNavigate } from "react-router-dom";



export default function LandingView() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(import.meta.env);
  //To handle login  
  const handleLogin = () => {
    if (token) {
      navigate("/trip/1"); 
    } else { 
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      console.log(import.meta.env);
      const loginUrl = `${serverUrl}/auth/google`;
      window.location.href = loginUrl;
    }
  }; 
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col justify-end gap-8 h-[40%] p-10 bg-primary">
        <h1 className="font-bold text-6xl text-on-primary">trip planner</h1>
        <Button
          variant="outline"
          className="text-lg md:text-xl w-fit h-fit border-none text-primary"
          onClick={handleLogin}
        >
          get started
        </Button>
      </div>
      <div className="grow flex flex-col items-center justify-evenly p-10 gap-10">
        <div className="flex flex-col md:flex-row gap-8">
          <LandingCard>Everyone's daily itinerary</LandingCard>
          <LandingCard>Everyone's maps and pins</LandingCard>
          <LandingCard>Everyone's budget and expenses</LandingCard>
        </div>
        <div className="text-3xl text-center font-bold text-secondary">
          all in just <span className="underline">one place</span>
        </div>
        <Button className="text-lg md:text-xl w-fit h-fit text-on-primary"
        onClick={handleLogin}
        >
          get started
        </Button>
      </div>
    </div>
  );
}
