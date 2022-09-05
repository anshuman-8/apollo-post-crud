import { hash, genSaltSync, compare } from 'bcryptjs';
import { ApolloError } from "apollo-server-express";
import { issueToken, serializeUser } from '../../functions';
import {loginUserValidator,registerNewUserVadidator} from '../../validators';

export default {

    Query:{
        helloUser:(_,args,context)=>{
            console.log(context)
            return 'Hello User'},

        getAllUsers:async(_,args,{User})=>{
            const users=await User.find();
            return users;
        },

        getUser:async(par,args,{User,user},info)=>{
            try{
                const userData=await User.findById(args.id);
                if(userData!==user.id){
                    throw new ApolloError('You are not authorized to view this user');
                }
                return user
                
            }catch(err){
                throw new ApolloError(err.message,500);
            }
           
        },

        loginUser:async(par,args,{User},info)=>{
            try{
            await loginUserValidator.validate({username:args.username,password:args.password},{abortEarly:false});
            let user=await User.findOne({username:args.username});
            if(!user){
                throw new ApolloError('User not found');
            };

            let isMatch= await compare(args.password,user.password);
            // const isMatch=await user.comparePassword(args.password);
            if(!isMatch){
                throw new ApolloError('Invalid Password');
            };

            user= user.toObject();
            user.id=user._id;

            user=serializeUser(user);

            let token = await issueToken(user);

            return {user:user,token};

            }catch(err){
                throw new ApolloError(err.message,403)
            }
            
        },

        authenticatedUser:async(_,args,context,info)=>{
            // console.log(context);
            return context.user;
        }
    },

    Mutation:{
        registerNewUser:async(par,args,{User},info)=>{
            try{
                await registerNewUserVadidator.validate(args.user,{abortEarly:false});
                let {username,password}=args.user;
                // first check if username is already exists
                let user= await User.findOne({username});
                if(user){
                    throw new ApolloError('Username already exists');
                };

                // create new user instance
                user = new User(args.user);

                // hash password
                const salt = await genSaltSync(10);
                user.password=await hash(password,salt);

                // save the user to the database
                let result = await user.save();

                result= result.toObject();
                result.id=result._id;

                result=serializeUser(result);

                let token = await issueToken(result);
                console.log({token,User:result})
                return {token,user:result};
            }catch(err){
                throw new ApolloError(err.message,400)
            }
            
        },

        updateUser:async(par,args,{User},info)=>{
            const user=await User.findByIdAndUpdate(args.id,args.user,{new:true})
            return user;
        },

        deleteUser:async(par,args,{User},info)=>{
            const user=await User.findByIdAndDelete(args.id);
            return user;
        },
    }
}