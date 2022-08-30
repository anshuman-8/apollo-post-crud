import Post from "../../models/post";

export default {
    Query:{
        hello:()=>"Hello World, its graphql",

        getAllPosts:async()=>{
            const posts=await Post.find();
            return posts
        },
        getPost:async(parent,args,context,info)=>{
            const post=await Post.findById(args.id);
            return post;
        },
    },

    Mutation:{
        createNewPost: async(parent,args,context,info)=>{
            const newPost=args.inputPost;
            let result= await Post.create(newPost);
            return (result);
        },
        updatePost: async(parent,args,context,info)=>{
            const updatedPost=await Post.findByIdAndUpdate(args.id,args.inputPost,{new: true});
            return updatedPost;
        },
        deletePost: async(parent,args,context,info)=>{
            const deletedPost=await Post.findByIdAndDelete(args.id);
            return deletedPost;
        }

    }
}