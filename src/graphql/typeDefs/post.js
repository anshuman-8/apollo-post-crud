import {gql} from 'apollo-server-express';

export default gql`
    
    extend type Query{
        helloPost:String!
        getAllPosts:[Post!]! 
        getPost(id:ID!):Post!
        getPostsByLimit(limit:Int,page:Int):PostPage!
        getAuthUsersPosts: [Post!]!
    }

    extend type Mutation{
        deletePost(id:ID!):Post!
        createNewPost(inputPost:inputPost!):Post!
        updatePost(id:ID!,inputPost:inputPost!):Post!
    }

    type PostPage{
        posts:[Post!]!
        paginator:Paginator!
    }

    type Paginator{
        postCount:Int!
        currentPage:Int!
        perPage:Int!
        pageCount:Int!
        slNo:Int!
        hasPrevPage:Boolean!
        hasNextPage:Boolean!
        next:Int
        prev:Int
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