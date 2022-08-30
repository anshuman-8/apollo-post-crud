import {config} from 'dotenv';

const {parsed} = config(); // it will contain all the keys and values from .env file

export const {
    PORT,
    MODE,
    BASE_URL,
    DB="mongodb://localhost:27017/post-gql",
    IN_PROD=MODE==='prod',
    URL=`${BASE_URL}${PORT}`,
} = parsed;