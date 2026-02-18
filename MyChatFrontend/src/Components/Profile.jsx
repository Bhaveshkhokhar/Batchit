import {  useOutletContext } from "react-router-dom";
import ProfileWindow from "./ProfileWindow";
import RightWindowP from "./RightWindowP";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

function Profile(){
  const {dark}= useOutletContext();
  return <>
  <LeftContainer> <ProfileWindow dark={dark}/></LeftContainer>
 <RightContainer><RightWindowP dark={dark}/></RightContainer>
  
  </>
}
export default Profile;