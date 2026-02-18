import { useParams } from "react-router-dom";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
function Chats({dark}){
    const { id } = useParams(); 
  return <>
  <LeftContainer><ChatList dark={dark}/></LeftContainer>
  <RightContainer><ChatWindow id={id ?? null} dark={dark} /></RightContainer>
  
  </>
}
export default Chats;