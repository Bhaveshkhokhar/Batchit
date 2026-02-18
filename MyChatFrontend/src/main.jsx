import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider}  from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css"; 
import Mainpage from './Components/Mainpage.jsx';
import App from './App.jsx';
import Chats from './Components/Chats.jsx';
import LandingPage from './Components/LandingPage.jsx';
import AuthContextProvider from './Context/Auth.jsx';
import Status from './Components/Status.jsx';
import Call from './Components/Call.jsx';
import Setting from './Components/Setting.jsx';
import Profile from './Components/Profile.jsx';
import UserContext from './Context/User.jsx';
import UserContextProvider from './Context/User.jsx';

const router=createBrowserRouter([{
  path:"/",element:<App/>,
  children: [
      { path: "/", element: <Mainpage/>,children:[
        {path:"/status",element:<Status></Status>},
        {path :"/call",element:<Call></Call>},
        {path :"/setting",element:<Setting></Setting>},
        {path: "/profile", element:<Profile></Profile>},
        {path: "/:id?",element:<Chats/>},
      ] },
      {path:"/Login",element :<LandingPage/>}
     
    ],
}]);
createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
      <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserContextProvider>
    </AuthContextProvider>
    
  ,
)
