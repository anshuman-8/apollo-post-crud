import {gql} from 'apollo-server-express';

export default gql`
    extend type Query{
        # getAllPosts:[Post!]!
        hello:String!
    }
`