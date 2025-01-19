import "./style.css";

//function to display navigation bar UI
function NavigationBarUI(data) {
  //function to handle user logout
  async function handleLogout() {
    const response = await fetch("http://localhost:8000/user/logout", {
      method: "GET",
      credentials: "include", // Required to send cookies with the request
    });
    const temp = await response.json();
    data.setUser(temp.user);
  }

  return (
    <div className="row">
      <p className="header">Task</p>

      {!data.user ? (
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="buttonClass" onClick={data.openSignupPage}>
            {" "}
            signUp{" "}
          </button>
          <button className="buttonClass" onClick={data.openLoginPage}>
            {" "}
            login{" "}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "10px" }}>
          <p className="header">{data.user}</p>
          <button className="buttonClass" onClick={handleLogout}>
            {" "}
            logout{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default NavigationBarUI;
