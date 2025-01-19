import "./completedTask.css";
import { useState } from "react";
import OpenPopup from "./OpenPopup";
import DisplayCompletedTask from "./DisplayCompletedTask";

function CompletedTaskItems(data) {
  const [popUp, setPopUp] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  //function to close popup
  function closePopUp() {
    setPopUp(false);
  }

  return (
    <div>
      <DisplayCompletedTask
        completionDate={data.completionDate}
        setIsVerified={setIsVerified}
        setPopUp={setPopUp}
        title={data.title}
      />

      {popUp ? (
        <OpenPopup isVerified={isVerified} closePopUp={closePopUp} />
      ) : null}
    </div>
  );
}

export default CompletedTaskItems;
