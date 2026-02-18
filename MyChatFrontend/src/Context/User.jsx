import { createContext, use, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import getUserDetail from "../service/UserService";
import { AuthContext } from "./Auth";
export const UserContext = createContext({
  userDetail:{},
  updateUserDetail: () => {},
  loadingUser:Boolean,
  setLoadingUser:()=>{}
});
function UserContextProvider({children}){

  const {loading,isAuthenticated}=useContext(AuthContext);

  const [userDetail,setUserDetail]=useState({});
  const [loadingUser,setLoadingUser]=useState(true);


  function updateUserDetail(user){
    setUserDetail(user);
  }

  useEffect(()=>{
    if (loading) return;

    if (!isAuthenticated) {
      setUserDetail({});
      setLoadingUser(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    setLoadingUser(true);

    getUserDetail(signal)
      .then((data) => {
        updateUserDetail(data.response);
      })
      .catch((err) => {
        console.error("Error fetching user details:",err);
        toast.error(err.message || "Failed to fetch user details");
      })
      .finally(() => {
        setLoadingUser(false);
      });

    return () => controller.abort();
  },[isAuthenticated,loading]);


  return (
    <UserContext.Provider value={{userDetail,updateUserDetail,loadingUser,setLoadingUser}}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;