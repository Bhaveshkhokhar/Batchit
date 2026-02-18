import './css/RightContainer.css';
function LeftContainer({children,dark}) {
  return (
    <div className={`left-container ${dark ? "dark" : "light"}`}>
      {children}
    </div>
  );
} export default LeftContainer;