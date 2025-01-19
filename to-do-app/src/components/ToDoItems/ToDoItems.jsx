import "./ToDoItems.css";
import { useState } from "react";
import TaskCompletePopup from "./TaskCompletePopup";
import EditTaskPopup from "./EditTaskPopup";
import DisplayItems from "./DisplayItem";

//function to display item to UI from user to-do list
function ToDoItems(data) {
  const formattedDate = new Date(data.dueDate).toLocaleDateString("en-GB");
  const [taskDetails, setTaskDetails] = useState(data.title);
  const [dueDate, setDueDate] = useState(
    new Date(data.dueDate).toISOString().split("T")[0]
  );
  const [showPopup, setShowPopup] = useState([false, false]);

  //function executed when check box is clicked to open popup to confirm task completion-----------------
  function taskComplete() {
    setShowPopup([true, false]);
  }

  //function executed when edit button clicked to to open popup to edit task----------------
  async function handelEdit() {
    setShowPopup([false, true]);
  }

  //function to close any popup------------
  function closePopUp() {
    setShowPopup([false, false]);
  }

  return (
    <div>
      {/*Display task to UI  */}
      <DisplayItems
        taskComplete={taskComplete}
        formattedDate={formattedDate}
        handelEdit={handelEdit}
        updateMyToDoList={data.updateMyToDoList}
        title={data.title}
        userName={data.userName}
        taskId={data.taskId}
      />

      {/* to open popup, onclick on check box to complete task */}
      {showPopup[0] && (
        <TaskCompletePopup
          updateMyToDoList={data.updateMyToDoList}
          closePopUp={closePopUp}
          title={data.title}
          taskId={data.taskId}
          userName={data.userName}
          updateCompletedTask={data.updateCompletedTask}
        />
      )}

      {/* to open popup, onclick on edit button */}
      {showPopup[1] && (
        <EditTaskPopup
          taskDetails={taskDetails}
          setTaskDetails={setTaskDetails}
          dueDate={dueDate}
          setDueDate={setDueDate}
          setShowPopup={setShowPopup}
          closePopUp={closePopUp}
          taskId={data.taskId}
          userName={data.userName}
          updateMyToDoList={data.updateMyToDoList}
        />
      )}
    </div>
  );
}

export default ToDoItems;
