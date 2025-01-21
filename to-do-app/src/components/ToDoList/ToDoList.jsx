import ToDoItems from "../ToDoItems/ToDoItems";
import "./ToDoList.css";

//function to show each task in my to-do list in UI by calling ToDoItems component
function ToDoList(data) {
  return (
    <div className="listContainer">
      {!data.items ? (
        <p>No todos available</p>
      ) : (
        <ol>
          {data.items.map((item) => (
            <ToDoItems
              updateCompletedTask={data.updateCompletedTask}
              updateMyToDoList={data.updateMyToDoList}
              userName={data.userName}
              taskId={item.taskId}
              key={item.taskId}
              dueDate={item.dueDate}
              title={item.taskDetails}
            />
          ))}
        </ol>
      )}
      {/* <ol>
        {data.items.map((item) => (
          <ToDoItems
            updateCompletedTask={data.updateCompletedTask}
            updateMyToDoList={data.updateMyToDoList}
            userName={data.userName}
            taskId={item.taskId}
            key={item.taskId}
            dueDate={item.dueDate}
            title={item.taskDetails}
          />
        ))}
      </ol> */}
    </div>
  );
}

export default ToDoList;
