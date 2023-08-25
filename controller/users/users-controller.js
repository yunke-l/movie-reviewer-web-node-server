
import * as usersDao from "./users-dao.js";
const UserController = (app) => {  // use express instance app to declare HTTP GET
    app.get('/api/users', findAllUsers); // request pattern /api/users to call a function
    app.get('/api/users/:uid', findUserById); // map path pattern to handler function
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const findUsers = (req, res) => {   // function runs when /api/users requested
    const type = req.query.type  // retrieve type parameter from query
    if(type) { // if type parameter in query
      const usersOfType = users.filter(u => u.type === type)  // find users of that type
      res.json(usersOfType)
      return
    }
    res.json(users)  // responds with JSON array of users
}

const findAllUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else if (username) {
      const user = await usersDao.findUserByUsername(username);
      if (user) {
        res.json(user);
      } else {
        res.sendStatus(404);
      }
    } else {
      const users = await usersDao.findAllUsers();
      res.json(users);
    }
  };

const findUserById = async (req, res) => {
    const id = req.params.uid;
    const user = await usersDao.findUserById(id);
    res.json(user);
}

const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser); // respond with new user to client
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.deleteUser(id);
    res.json(status);
    
}

const updateUser = async (req, res) => {
    const id = req.params.uid;
    const updates = req.body;
    const status = await usersDao.updateUser(uid, updates);
    // const status = await usersDao.updateUser(id, updates);
    // const user = await usersDao.findUserById(id); 
    const user = await usersDao.findUserById(uid); // retrieve user with new changes
    req.session["currentUser"] = user; // update currentUser with changes
    res.json(status);
}

// Add follow and unfollow logic 
export const followUser = async (req, res) => {
  const followerId = req.params.followerId;
  const userIdToFollow = req.params.userIdToFollow;

  try {
    const status = await usersDao.followUser(followerId, userIdToFollow);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  const followerId = req.params.followerId;
  const userIdToUnfollow = req.params.userIdToUnfollow;

  try {
    const status = await usersDao.unfollowUser(followerId, userIdToUnfollow);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default UserController;