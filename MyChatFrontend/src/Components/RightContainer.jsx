import './css/RightContainer.css';
function RightContainer({ children, dark }) {
  return <div className={`right-container ${dark ? "dark" : "light"}`}>{children}</div>
}
export default RightContainer;