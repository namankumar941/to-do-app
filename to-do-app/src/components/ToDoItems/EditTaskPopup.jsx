import "./ToDoItems.css";

//function to open popup onclick of edit button
function EditTaskPopup(data) {
  
  //function executed when it is comfirmed that task is edited----------------
  async function editCompleted() {
    const response = await fetch("http://localhost:8000/task/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: data.taskId,
        userName: data.userName,
        taskDetails: data.taskDetails,
        dueDate: data.dueDate,
      }),
      credentials: "include",
    });

    const details = await response.json();
    data.updateMyToDoList(details.myToDoList);
    data.setShowPopup([false, false]);
  }
  return (
    <div className="popupBox">
      <div className="popupBoxStyle">
        <h3 className="header">Edit Task</h3>

        <input
          type="text"
          placeholder="Enter task details"
          value={data.taskDetails}
          onChange={(e) => data.setTaskDetails(e.target.value)}
          className="input"
        />
        <input
          type="date"
          placeholder="Enter task due date"
          value={data.dueDate}
          onChange={(e) => data.setDueDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="input"
        />

        <div className="row">
          <button className="buttonClass" onClick={editCompleted}>
            {" "}
            done{" "}
          </button>
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
    </div>
  );
}

export default EditTaskPopup;
