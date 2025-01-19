import { useState, useEffect } from "react";

import AddTaskPopup from "./AddTaskPopup";
import SignUpPopup from "./SignUpPopup";
import LoginPopup from "./LoginPopup";
import NavigationBarUI from "./NavigationBarUI";
import PageUI from "./PageUI";

import "./style.css";

function App() {
  const [myToDoList, setMyToDoList] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [showPopup, setShowPopup] = useState([false, false, false]);
  const [taskDetails, setTaskDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // execute when user enter in app for first time
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/user", {
        method: "GET",
        credentials: "include",
      });
      const temp = await response.json();
      setUser(temp.user);
      setMyToDoList(temp.myToDoList);
      setCompletedTask(temp.completedTask);
    };
    fetchData();
  }, []);

  //function to update my to-do list to display over UI
  function updateMyToDoList(newList) {
    setMyToDoList(newList);
  }

  //function to update my completed task list to display over UI
  function updateCompletedTask(newList) {
    setCompletedTask(newList);
  }

  // functions to open different popup and close it
  function openSignupPage() {
    setShowPopup([false, true, false]);
  }
  function openLoginPage() {
    setShowPopup([false, false, true]);
  }
  function openPopUp() {
    setShowPopup([true, false, false]);
  }
  function closePopUp() {
    setShowPopup([false, false, false]);
    setResponseMessage("");
  }

  return (
    <div className="column">
      {/* to display Navigation Bar UI */}
      <NavigationBarUI
        user={user}
        openSignupPage={openSignupPage}
        openLoginPage={openLoginPage}
        setUser={setUser}
      />

      {/* to display to-do page UI */}
      {user && (
        <PageUI
          updateCompletedTask={updateCompletedTask}
          updateMyToDoList={updateMyToDoList}
          myToDoList={myToDoList}
          user={user}
          openPopUp={openPopUp}
          completedTask={completedTask}
        />
      )}

      {/* to open popup to add task */}
      {showPopup[0] && (
        <AddTaskPopup
          taskDetails={taskDetails}
          setTaskDetails={setTaskDetails}
          dueDate={dueDate}
          setDueDate={setDueDate}
          user={user}
          closePopUp={closePopUp}
          setMyToDoList={setMyToDoList}
          setShowPopup={setShowPopup}
        />
      )}

      {/* to open popup to fill detain for signup */}
      {showPopup[1] && (
        <SignUpPopup
          responseMessage={responseMessage}
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          closePopUp={closePopUp}
          setShowPopup={setShowPopup}
          setResponseMessage={setResponseMessage}
        />
      )}

      {/* to open popup to login */}
      {showPopup[2] && (
        <LoginPopup
          responseMessage={responseMessage}
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          setMyToDoList={setMyToDoList}
          closePopUp={closePopUp}
          setCompletedTask={setCompletedTask}
          setShowPopup={setShowPopup}
          setUser={setUser}
          setResponseMessage={setResponseMessage}
        />
      )}
    </div>
  );
}

export default App;
