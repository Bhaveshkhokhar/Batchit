import { Outlet } from "react-router-dom";
import Loading from "./Components/Loading";
import { useContext } from "react";
import { AuthContext } from "./Context/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SocketProvider from "./Context/SocketContext";

function App() {
 const {loading}= useContext(AuthContext);
 if(loading)return <Loading />
  return (
    <>
    <SocketProvider>
      <Outlet></Outlet>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      </SocketProvider>
      </>
  );
}

export default App;
