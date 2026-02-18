import { createContext, useContext, useEffect } from "react";
import { connectWebSocket, disconnectWebSocket } from "../service/websocket";
import { UserContext } from "./User"; // your user context
import { AuthContext } from "./Auth";

export const SocketContext = createContext();

 const SocketProvider = ({ children }) => {
  const { userDetail } = useContext(UserContext);
  const  {isAuthenticated} = useContext(AuthContext);

  useEffect(() => {

    if (isAuthenticated) {
      connectWebSocket(handleIncomingMessage);
    }

    return () => {
      disconnectWebSocket();
    };

  }, [isAuthenticated]);

  const handleIncomingMessage = (message) => {
    console.log("Incoming message:", message);

    // Here you update your global message store
    // Example:
    // dispatch({ type: "NEW_MESSAGE", payload: message });
  };

  return (
    <SocketContext.Provider value={{}}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;