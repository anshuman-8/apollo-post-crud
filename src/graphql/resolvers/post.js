// import Post from "../../models/post"; // well I am getting post from context

export default {
    Query:{
        hello:(parent,args,{Post},info)=>"Hello World, its graphql",

        getAllPosts:async(parent,args,{Post},info)=>{
            const posts=await Post.find();
            return posts
        },
        getPost:async(parent,args,{Post},info)=>{
            const post=await Post.findById(args.id);
            return post;
        },
    },

    Mutation:{
        createNewPost: async(parent,args,{Post},info)=>{
            const newPost=args.inputPost;
            let result= await Post.create(newPost);
            return (result);
        },
        updatePost: async(parent,args,{Post},info)=>{
            const updatedPost=await Post.findByIdAndUpdate(args.id,args.inputPost,{new: true});
            return updatedPost;
        },
        deletePost: async(parent,args,{Post},info)=>{
            const deletedPost=await Post.findByIdAndDelete(args.id);
            return deletedPost;
        }

    }
}