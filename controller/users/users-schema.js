import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ["admin", "verified", "regular"],
    default: "regular" // Default role if not specified
  },
  email: String,
  avatar: {
    type: String,
    default: "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg" // Set the default avatar path
  },
  level:{
    type: Number,
    default: 0
  },

  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],// the array's default value will be an empty array []
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
  

}, { collection: "users" });


usersSchema.pre("save", function(next) {
  if (this.email) {
    this.role = "verified"; // Set role to "verified" if email is provided
  } else {
    this.role = "regular"; // Set role to "regular" if email is not provided
  }
  next();
});

export default usersSchema;