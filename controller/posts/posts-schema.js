import mongoose from 'mongoose';
const schema = mongoose.Schema({
   // _id: ObjectId,          // Unique identifier for the post
    //userId: ObjectId,       // ID of the user who created the post
    imdbid: String,         // IMDb ID of the movie the post is about
    movieTitle: String,
    moviePoster: String,
    title: String,          // Title of the review post
    content: String,        // Text content of the review
    username: String,
    likes: Number,
    liked: Boolean,
    dislikes: Number,
    disliked: Boolean,
    // rating: Number,         // Rating given by the user (e.g., 1 to 10)
    createdAt: Date,        // Timestamp of when the post was created
    //createdAt: String,
    // updatedAt: Date,        // Timestamp of when the post was last updated
  }, {collection: 'posts'}); 
  export default schema;
  