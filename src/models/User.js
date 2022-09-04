import {Schema,model} from 'mongoose';

const postSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:false,
    },
    first_Name:{
        type:String,
        required:true,
    },
    last_Name:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:true,
    },
    avatarImage:{
        type:String,
        required:false,
        default:"https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360",
    }

},{timestamps:true});

const User=model('users',postSchema);

export default User;