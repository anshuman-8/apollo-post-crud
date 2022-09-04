import {gql} from 'apollo-server-express';

export default gql`
    # directive @isAuth on Field_DEFINITION
    type Query{
        hello:String!
    }

    type Mutation{
        working(txt:Int!):String!
    }
`;