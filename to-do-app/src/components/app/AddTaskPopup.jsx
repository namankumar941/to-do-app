import "./style.css";

//function to open popup to add task to to-do list
function AddTaskPopup(data) {
  
  //function to hanple API call to add task
  async function handleAddTask() {
    const response = await fetch("http://localhost:8000/task/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: data.user,
        taskDetails: data.taskDetails,
        dueDate: data.dueDate,
      }),
      credentials: "include",
    });

    const temp = await response.json();
    data.setMyToDoList(temp.myToDoList);
    data.setTaskDetails("");
    data.setDueDate("");
    data.setShowPopup([false, false, false]);
  }

  return (
    <div className="popupBox">
      <div className="popupBoxStyle">
        <h3 className="header">Add To-Do Task</h3>
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
          <button className="buttonClass" onClick={handleAddTask}>
            {" "}
            Add{" "}
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

export default AddTaskPopup;
