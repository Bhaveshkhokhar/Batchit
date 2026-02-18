import {  useOutletContext } from "react-router-dom";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import SettingWindow from "./SettingWindow";
import SettingWindowRight from "./SettingWindowRight";
function Setting(){
  const {dark}= useOutletContext();
  return <>
  <LeftContainer> <SettingWindow dark={dark}/></LeftContainer>
 <RightContainer><SettingWindowRight dark={dark}/></RightContainer></>
}
export default Setting;