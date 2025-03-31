import { Navigate, Outlet } from "react-router";
// import {jwtDecode} from "jwt-decode"; 


// interface DecodedToken{
//     exp:number;
// }

export default function ProtectedRoute(){
    return <Outlet/>;
    // const token= localStorage.getItem("token");
    // if (!token)
    // {
    //     return <Navigate to="/" replace/>;
    // } 
    // try{
    //     const decoded: DecodedToken= jwtDecode(token); 
    //     if (Date.now()>= decoded.exp*1000)
    //     {
    //         localStorage.removeItem("token"); 
    //         return <Navigate to="/" replace/>;

    //     }
    //     return <Outlet/>;

    // }
    // catch{
    //     localStorage.removeItem("token"); 
    //     return <Navigate to="/" replace/>;
    // }

}