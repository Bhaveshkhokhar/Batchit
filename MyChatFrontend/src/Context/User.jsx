import { createContext, use, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import getUserDetail from "../service/UserService";
import { AuthContext } from "./Auth";
export const UserContext = createContext({
  userDetail:{},
  updateUserDetail: () => {},
  loadingUser:Boolean,
  setLoadingUser:()=>{},
  chats:[],
  setChats:()=>{},
  contacts:[],
  setContacts:()=>{}
});
function UserContextProvider({children}){

  const {loading,isAuthenticated}=useContext(AuthContext);
  const [userDetail,setUserDetail]=useState({});
  const [loadingUser,setLoadingUser]=useState(true);
  const [chats,setChats]=useState(tempChats);
  const [contacts,setContacts]=useState([]);


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
        updateUserDetail(data.response.user);
        //setChats(data.response.chats);
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
    <UserContext.Provider value={{userDetail,updateUserDetail,loadingUser,setLoadingUser,chats,setChats,contacts,setContacts}}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;

const tempChats=[
  {
    "converationID": "uuid-001",
    "name": "Team Alpha",
    "lastMessage": "Meeting at 5?",
    "lastUserName": "Sarah",
    "unreadMessage": 3,
    "groupDpPresignedUrl": "default",
    "lastMessageAt": "2026-02-20T20:15:00Z",
    "type": "GROUP"
  },
  {
    "converationID": "uuid-002",
    "name": "John Doe",
    "lastMessage": "Check this out",
    "lastUserName": "John Doe",
    "unreadMessage": 0,
    "groupDpPresignedUrl": "default",
    "lastMessageAt": "2026-02-20T19:45:00Z",
    "type": "ONE_TO_ONE"
  }
];
