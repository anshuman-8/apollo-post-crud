// import Post from "../../models/post"; // well I am getting post from context
import { ApolloError } from "apollo-server-express";



export default {
    Query:{
        helloPost:(parent,args,{Post},info)=>"Hello World, its graphql",

        getAllPosts:async(parent,args,{Post},info)=>{
            const posts=await Post.find().populate('author');
            return posts
        },
        getPost:async(parent,args,{Post},info)=>{
            const post=await Post.findById(args.id).populate('author');
            return post;
        },
        getPostsByLimit:async(parent,args,{Post},info)=>{
            let {page,limit} = args;

            const myCustomLabels = {
                totalDocs: 'postCount',
                docs: 'posts',
                limit: 'perPage',
                page: 'currentPage',
                nextPage: 'next',
                prevPage: 'prev',
                totalPages: 'pageCount',
                pagingCounter: 'slNo',
                meta: 'paginator',
              };
          
              const options = {
                page: page || 1,
                limit: limit || 10,
                sort: { createdAt: -1 },
                populate: 'author',
                customLabels: myCustomLabels,
              };
          
              let posts=await Post.paginate({}, options);
              return posts;
        },
        getAuthUsersPosts:async(parent,args,{Post},info)=>{
            const posts=await Post.find({author:args.id}).populate('author');
            return posts;
        }
    },

    Mutation:{
        createNewPost: async(parent,args,{Post,user},info)=>{
            const newPost=args.inputPost;
            newPost.author=user;
            let result= await Post.create({...newPost,author:user});
            await result.populate('author');
            return (result);
        },
        updatePost: async(parent,args,{Post,user},info)=>{
            try{
                const updatedPost=await Post.findByIdAndUpdate({_id:args.id, author:user.id.toString()},args.inputPost,{new: true}).populate('author');
            if(updatedPost){
                return updatedPost;
            }else{
                throw new ApolloError("Post not found or user not authorized");
            }

            }catch(err){
                throw new ApolloError(err.message,500);
            }
            
        },
        deletePost: async(parent,args,{Post,user},info)=>{
            try{
                const deletedPost=await Post.findByIdAndDelete({_id:args.id, author:user.id.toString()}).populate('author');
            if(deletedPost){
                return deletedPost;
            }else{
                throw new ApolloError("Post not found or user not authorized");
            }

            }catch(err){
                throw new ApolloError(err.message,500);
            }
        }

    }
}
