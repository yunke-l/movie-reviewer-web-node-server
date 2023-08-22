import express from 'express';
import cors from 'cors';
import PostsController from './controller/posts/posts-controller.js';
import session from "express-session";
import UserController from './controller/users/users-controller.js';
import AuthController from './controller/users/auth-controller.js';


import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/movie-reviewer");


const app = express();
app.use(
    cors({
      credentials: true,
      //origin: process.env.FRONTEND_URL,
      origin: "http://localhost:3000",
    })
);
// const sessionOptions = { // configure server session after cors
//     secret: "any string", // this is a default session configuration that works fine locally, but needs to be tweaked further to work in a remote server such as AWS, Render, or Heroku. See later
//     resave: false,
//     saveUninitialized: false,
//   };
//   app.use(
//     session(sessionOptions)
// );

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


app.use(express.json());
const port = process.env.PORT || 4000;

// app.use((req, res) => {
//     res.status(404).send('Not Found');
//   });

//app.listen(4000);


PostsController(app);
UserController(app);
AuthController(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
