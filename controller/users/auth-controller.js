import * as usersDao from "./users-dao.js";
var currentUserVar;
const AuthController = (app) => {
    
 const register = async (req, res) => { 
    // const username = req.body.username;
    // const user = usersDao.findUserByUsername(username);
    // if (user) {
    //   //console.log("Username already exists.")
    //   res.sendStatus(409).send({error: "Username already exists."});
    //   return;
    // }
    // // const newUser = usersDao.createUser(req.body);
    // const newUser = {   _id: new Date().getTime() + "", firstName:req.body.firstName, lastName:req.body.lastName, username:req.body.username, password:req.body.password  }
    // usersDao.createUser(newUser);
    // //currentUserVaribale = newUser;
    // req.session["currentUser"] = newUser;
    // console.log(newUser)
    // res.json(newUser);
    // //console.log("User registered")
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
 };

 const login = async (req, res) => {
    // const username = req.body.username;
    // const password = req.body.password;
    // const user = usersDao.findUserByCredentials(username, password);
    // if (user) {
    //   req.session["currentUser"] = user;
    //   res.json(user);
    //   //console.log("User logged in.")
    // } else {
    //   res.sendStatus(404).send("User doesn't exist");
    //   //res.status(404).json({ error: "User doesn't exist" });
    //   //console.log("User doesn't exist")
    // }
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }

  };
 
  const profile  = async (req, res) => { 
   //const currentUser = currentUserVar;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
    //console.log("current user", currentUser)
 };

 const logout  = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

 const update = async (req, res) => {
    // const username = req.body.username;
    // //const currentUser = usersDao.findUserByUsername(username);
    // const currentUser = req.session["currentUser"];
    // const updates = req.body;
    // const updateResult = usersDao.updateUser(currentUser._id, updates);
    // if (updateResult && updateResult.status === 'ok') {
      // // Update the current user in the session
      // req.session["currentUser"] = { ...currentUser, ...updates };
      // const updatedUser = { ...updates };
      // res.status(200).json({ user: updatedUser });
    // } else {
    //   res.sendStatus(404);
    // }

    const user = await usersDao.updateUser(req.body._id, req.body);
    if (user) {
      //currentUserVar = user;
      //req.session["currentUser"] = user;
      //res.status(200).json({ user: currentUserVar });

      req.session["currentUser"] = { ...user, ...req.body };
      const updatedUser = { ...req.body };
      res.status(200).json({ user: updatedUser });

      //return res.json(currentUserVar);
    } else {
      res.sendStatus(500);
    }
   };

 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 //app.put ("/api/users/:uid",     update);
 app.put ("/api/users",     update);
};
export default AuthController;