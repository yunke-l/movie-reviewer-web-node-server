import * as postsDao from './posts-dao.js'

const createPost = async (req, res) => {
    const newPost = req.body;
    newPost.likes = 0;
    newPost.dislikes = 0;
    newPost.liked = false;
    newPost.disliked = false;
    // newPost.createAt = "1 min",
    // newPost.title = "Untitled";
    newPost.title = newPost.title || "Untitled";
    newPost.reposts = 0;
    newPost.replies = 0;
    const insertedPost = await postsDao.createPost(newPost); // actual post inserted in database with DAO's createpost
    res.json(insertedPost);
}

const findPosts = async (req, res) => {
    // const posts = await postsDao.findPosts()
    // res.json(posts);
    const userId = req.query.userId;
    if (userId) {
        const posts = await postsDao.findPostByUserId(userId);
        res.json(posts);
    } else {
        const posts = await postsDao.findPosts();
        res.json(posts);
    }
 }

 
const updatePost = async (req, res) => {  
    const postdIdToUpdate = req.params.pid;
    const updates = req.body;
    const status = await postsDao.updatePost(postdIdToUpdate, updates);
    res.json(status);
}

const deletePost = async (req, res) => {
    const postdIdToDelete = req.params.pid;
    const status = await postsDao.deletePost(postdIdToDelete); //success or failure status deleting record from database
    res.json(status);
}

const PostsController = (app) =>{
    app.post('/api/posts', createPost);
    app.get('/api/posts', findPosts);
    app.put('/api/posts/:pid', updatePost);
    app.delete('/api/posts/:pid', deletePost);
    // app.get('/api/posts/user', findPostsByUserId); 
}

export default PostsController;