import {gql} from 'apollo-server-express';

export default gql`
    
    extend type Query{
        helloPost:String!
        getAllPosts:[Post!]! 
        getPost(id:ID!):Post!
    }

    extend type Mutation{
        createNewPost(inputPost:inputPost!):Post!
        updatePost(id:ID!,inputPost:inputPost!):Post!
        deletePost(id:ID!):Post!
    }

    input inputPost{
        title:String!
        body:String!
        postImage:String
    }

    type Post{
        id:ID!
        title:String!
        body:String!
        postImage:String
        createdAt:String
        author:User!
    }
`;