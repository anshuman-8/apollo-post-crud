import {Schema,model} from 'mongoose';

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    postImage:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        required:false,
    },
    author:{
        ref:'users',
        type:Schema.Types.ObjectId,
    }
},{timestamps:true})

const Post=model('post',postSchema);

export default Post;