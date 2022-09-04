import {gql} from 'apollo-server-express';

export default gql`

    extend type Query{
        helloUser:String!
        getAllUsers:[User!]!
        getUser(id:ID!):User!
        loginUser(username:String!,password:String!):AuthResp!
        authenticatedUser:User!
    }

    extend type Mutation{
        registerNewUser(user:inputUser!):AuthResp!
        updateUser(id:ID!,user:inputUser!):User!
        deleteUser(id:ID!):User!
    }

    input inputUser{
        username:String!
        email:String
        first_Name:String!
        last_Name:String
        password:String!
        avatarImage:String
    }

    type User{
        id:ID!
        username:String!
        email:String
        first_Name:String!
        last_Name:String
        avatarImage:String
    }

    type AuthResp{
        user: User!
        token:String!
    }
`;