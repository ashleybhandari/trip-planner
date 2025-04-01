
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallbackView() {
  const navigate = useNavigate();

useEffect(() => {
    setTimeout(() => {
    
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    const token = params.get("token");
  
      console.log("Token:", token);
  
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        // navigate("/");
        console.log("error")
      
      }
    }, 50); 
  }, []);

  return <p>Logging you in...</p>;
}
