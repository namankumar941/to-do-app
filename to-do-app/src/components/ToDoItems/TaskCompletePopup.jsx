import "./ToDoItems.css";

//function to open popup onclick on check box
function TaskCompletePopup(data) {

  //function executed when it is comfirmed that task is completed----------------
  async function taskCompleted() {
    const response = await fetch("http://localhost:8000/task/completed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskDetails: data.title,
        taskId: data.taskId,
        userName: data.userName,
      }),
      credentials: "include",
    });
    const details = await response.json();
    data.updateMyToDoList(details.myToDoList);
    data.updateCompletedTask(details.completedTask);
    data.closePopUp();
  }
  
  return (
    <div className="popupBox">
      <div className="popupBoxStyle">
        <h3 className="header">Task completed</h3>

        <div className="row">
          <button className="buttonClass" onClick={taskCompleted}>
            {" "}
            completed{" "}
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

export default TaskCompletePopup;
