import "./completedTask.css";
import CompletedTaskItems from "./completedTaskItems";

//function to show all completed task by user
function CompletedTask(data) {
  return (
    <div className="completedTasks">
      {!data.items ? (
        <p>No completed Tasks available</p>
      ) : (
        <ol>
          {data.items.map((completedTask) => (
            <CompletedTaskItems
              key={completedTask.taskId}
              completionDate={completedTask.dueDate}
              title={completedTask.taskDetails}
            />
          ))}
        </ol>
      )}
      {/* <ol>
        {data.items.map((completedTask) => (
          <CompletedTaskItems
            key={completedTask.taskId}
            completionDate={completedTask.dueDate}
            title={completedTask.taskDetails}
          />
        ))}
      </ol> */}
    </div>
  );
}

export default CompletedTask;
