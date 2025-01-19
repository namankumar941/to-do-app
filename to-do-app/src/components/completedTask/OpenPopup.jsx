import "./completedTask.css";

//function to open popup to show task completion verified or not
function OpenPopup(data) {
  return (
    <div className="popupBox">
      <div className="popupBoxStyle">
        <h3 className="header">Task completed</h3>

        {data.isVerified ? (
          <li style={{ width: "50px" }}> Verified </li>
        ) : (
          <li style={{ width: "80px" }}> Not Verified </li>
        )}

        <button
          onClick={data.closePopUp}
          className="buttonClass"
          style={{ backgroundColor: "rgb(255, 0, 0)" }}
        >
          {" "}
          Cancel{" "}
        </button>
      </div>
    </div>
  );
}

export default OpenPopup;
