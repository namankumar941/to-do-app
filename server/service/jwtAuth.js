const jwt = require("jsonwebtoken");
const secret = "nksingh@123";

class serviceAuth {
  createToken(user) {
    console.log("1")
    return jwt.sign(
      {
        userName: user.userName,
      },
      secret
    );
  }

  validateToken(token) {
    if (!token) return null;
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      return null;
    }
  }
}

module.exports = serviceAuth;
