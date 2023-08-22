import mongoose from 'mongoose';
import postsSchema from './posts-schema.js';

const postsModel = mongoose.model('PostModel', postsSchema);// create mongoose model from the schema
export default postsModel;