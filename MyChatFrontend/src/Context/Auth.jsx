import { createContext, useEffect, useState } from "react";
import { checkAuthStatus } from "../service/AuthService";
import { toast } from "react-toastify";

// Create a context for authentication state
export const AuthContext = createContext({
  isAuthenticated: Boolean,
  loading :Boolean,
  handleUserAuth:()=>{},
  setloading:()=>{}
});
function AuthContextProvider({ children }){
  const [isAuthenticated, setAuthenticated]= useState(false);
  const [loading, setloading]=useState(true);
  const handleUserAuth = (flag) => {
    setAuthenticated(flag);
  };

  useEffect(()=>{
    const controller=new AbortController();
    const signal=controller.signal;
    setloading(true);
    checkAuthStatus(signal)
    .then((data) => {
      setAuthenticated(true);
    })
    .catch((err) => { 
      setAuthenticated(false);
    }).finally(() => {
      setloading(false);
    });
    return ()=>{
      controller.abort();
    }
  },[]);


  return <AuthContext.Provider value={{ isAuthenticated,loading,handleUserAuth,setloading }}>
    {children}
  </AuthContext.Provider>;
};
export default AuthContextProvider;