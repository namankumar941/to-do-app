import "./style.css";

//function to open popup of signup and handle its API
function SignUpPopup(data) {
  
  //function to handle signup API
  async function handleSignup() {
    const response = await fetch("http://localhost:8000/user/signup", {
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
        <h3 className="header">signup</h3>
        <h3 style={{ color: "rgb(255, 0, 0)" }}>
          {data.responseMessage && <p>{data.responseMessage}</p>}
        </h3>
        <input
          type="text"
          placeholder="Enter unique user Name"
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
          <button className="buttonClass" onClick={handleSignup}>
            {" "}
            signup{" "}
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

export default SignUpPopup;
