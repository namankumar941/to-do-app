import "./style.css";

//function to open popup of login page and handle its API
function LoginPopup(data) {
  
  //function to handle signup API
  async function handleLogin() {
    const response = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: data.userName,
        password: data.password,
      }),
      credentials: "include",
    });
    if (response.ok) {
      const details = await response.json();
      data.setMyToDoList(details.myToDoList);
      data.setCompletedTask(details.completedTask);
      data.setUser(data.userName);
      data.setShowPopup([false, false, false]);
    } else {
      const error = await response.json();
      data.setResponseMessage(`${error.message}`);
    }
  }

  return (
    <div className="popupBox">
      <div className="popupBoxStyle">
        <h3 className="header">login</h3>
        <h3 style={{ color: "rgb(255, 0, 0)" }}>
          {data.responseMessage && <p>{data.responseMessage}</p>}
        </h3>
        <input
          type="text"
          placeholder="Enter user Name"
          value={data.userName}
          onChange={(e) => data.setUserName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter password"
          value={data.password}
          onChange={(e) => data.setPassword(e.target.value)}
          className="input"
        />

        <div className="row">
          <button className="buttonClass" onClick={handleLogin}>
            {" "}
            login{" "}
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

export default LoginPopup;
