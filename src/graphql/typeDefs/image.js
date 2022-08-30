import {gql} from 'apollo-server-express';

export default gql`
    scalar FileUpload

    extend type Query{
        info:String!
    }

    extend type Mutation{
        imageUploader(file:FileUpload!):String! # Upload type is already defineds
    }
`;