import "./completedTask.css";

function DisplayCompletedTask(data) {
  const formattedDate = new Date(data.completionDate).toLocaleDateString(
    "en-GB"
  );

  //function executed when verify button clicked to open popup to verify completed task task----------------
  async function verify() {
    const response = await fetch("http://localhost:8000/task/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completionDate: formattedDate,
        taskDetails: data.title,
      }),
      credentials: "include",
    });
    const details = await response.json();
    data.setIsVerified(details.bool);
    data.setPopUp(true);
  }

  return (
    <div className="completedTasks">
      <ol>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <li>{data.title} </li>
            <li>completion Date:-{formattedDate}</li>
          </div>
          <button className="verify-button" onClick={verify}>
            verify
          </button>
        </div>
      </ol>
    </div>
  );
}

export default DisplayCompletedTask;
