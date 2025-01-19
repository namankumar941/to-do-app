import "./style.css";
import ToDoList from "../ToDoList/ToDoList";
import CompletedTask from "../completedTask/completedTask";

//function to display navigation bar UI
function PageUI(data) {
  return (
    <div className="row">
      <div className="toDoContainer">
        <p className="header">To-Do</p>
        <ToDoList
          updateCompletedTask={data.updateCompletedTask}
          updateMyToDoList={data.updateMyToDoList}
          userName={data.user}
          items={data.myToDoList}
        />

        <div style={{ paddingTop: "20px", paddingLeft: "10px" }}>
          <button className="buttonClass" onClick={data.openPopUp}>
            {" "}
            add To-Do{" "}
          </button>
        </div>
      </div>

      <div className="toDoContainer">
        <p className="header">Completed</p>
        <CompletedTask items={data.completedTask} />
      </div>
    </div>
  );
}

export default PageUI;
