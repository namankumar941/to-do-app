import "./ToDoItems.css";

//function to display different todo task
function DisplayItems(data) {

  //function executed when any task is to be deleted----------------
  async function handelDelete() {
    const response = await fetch("http://localhost:8000/task/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: data.taskId,
        userName: data.userName,
      }),
      credentials: "include",
    });

    const details = await response.json();
    data.updateMyToDoList(details.myToDoList);
  }

  return (
    <div className="itemContainer">
      <button
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
        onClick={data.taskComplete}
      >
        {" "}
      </button>
      <div>
        <li>{data.title} </li>
        <li>Due Date:-{data.formattedDate}</li>
      </div>
      <button
        className="button"
        style={{ backgroundColor: " #007bff" }}
        onClick={data.handelEdit}
      >
        edit
      </button>
      <button
        className="button"
        style={{ backgroundColor: "rgb(255, 0, 0)" }}
        onClick={handelDelete}
      >
        delete
      </button>
    </div>
  );
}

export default DisplayItems;
