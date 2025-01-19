const User = require("../models/user");
const Task = require("../models/task");
const express = require("express");
const ServiceAuth = require("../service/jwtAuth");

const router = express.Router();

//----------------------------------------------controller class----------------------------------------------

class UserController {
  //function to manually parse cookie------------------------
  parseCookies(cookieHeader) {
    const cookies = {};
    cookieHeader?.split(";").forEach((cookie) => {
      const [key, value] = cookie.split("=");
      cookies[key.trim()] = decodeURIComponent(value);
    });
    return cookies;
  }

  //function executed when to display home page-------------------------------
  async homePage(req, res) {
    const cookies = this.parseCookies(req.headers.cookie);
    const user = serviceAuth.validateToken(cookies.token); //if user is present in cookie then user profile is displayed
    if (user) {
      req.user = user.userName;
    }

    if (!req.user) {
      return res.send({ user: null }); //if noo cookie then login page
    }

    const completedTask = await Task.find({
      $and: [{ userName: user.userName }, { status: "completed" }],
    });

    const myToDoList = await Task.find({
      $and: [{ userName: user.userName }, { status: "incomplete" }],
    }).sort({
      priority: 1,
    });

    res.send({
      user: req.user,
      completedTask: completedTask,
      myToDoList: myToDoList,
    });
  }

  //function executed when creating new account or signup------------------
  async postCreateAccount(req, res) {
    if (!req.body.userName || !req.body.password) {
      // Validate the data
      return res
        .status(400)
        .json({ message: "User name and password are required" });
    }

    if (!(await User.findOne({ userName: req.body.userName }))) {
      const user = await User.create({
        userName: req.body.userName,
        password: req.body.password,
      });

      const token = serviceAuth.createToken(user); //create jwt token

      res.cookie("token", token, {
        //save token in cookie
        httpOnly: true, // Makes the cookie inaccessible to JavaScript (for security)
        sameSite: "strict",
        secure: false, // Ensures the cookie is sent over HTTPS (set to true in production)
      });

      return res.status(200).json({
        message: "Login successful!",
      });
    } else {
      return res.status(401).json({ message: "user name already exist" });
    }
  }

  //function executed when user login-----------------------------------------
  async postLogIn(req, res) {
    // Validate the data
    if (!req.body.userName || !req.body.password) {
      return res
        .status(400)
        .json({ message: "User name and password are required" });
    }
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      //check password is correct and user present is database
      if (user.password === req.body.password) {
        const token = serviceAuth.createToken(user);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
        });
        const completedTask = await Task.find({
          $and: [{ userName: req.body.userName }, { status: "completed" }],
        }).sort({
          dueDate: 1,
        });

        const myToDoList = await Task.find({
          $and: [{ userName: req.body.userName }, { status: "incomplete" }],
        }).sort({
          priority: 1,
        });
        return res.status(200).json({
          message: "Login successful!",
          completedTask: completedTask,
          myToDoList: myToDoList,
        });
      } else {
        return res.status(401).json({ message: "incorrect password" });
      }
    } else {
      return res.status(401).json({ message: "user not exist" });
    }
  }

  //function executed when user logout----------------------------------------
  async logout(req, res) {
    res.clearCookie("token");
    return res.send({ user: null });
  }
  
}

//created class instance
const userController = new UserController();
const serviceAuth = new ServiceAuth();

//----------------------------------------------route----------------------------------------------
router.get("/", userController.homePage.bind(userController));
router.post("/signup", userController.postCreateAccount.bind(userController));
router.post("/login", userController.postLogIn.bind(userController));
router.get("/logout", userController.logout.bind(userController));

module.exports = router;
