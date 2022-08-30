import {config} from 'dotenv';

const {parsed} = config(); // it will contain all the keys and values from .env file

export const {
    PORT,
    MODE,
    DB="mongodb://localhost:27017/post-gql",
    IN_PROD=MODE==='prod'
} = parsed;