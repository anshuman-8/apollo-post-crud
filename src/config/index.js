import {config} from 'dotenv';

const {parsed} = config(); // it will contain all the keys and values from .env file

export const {
    PORT,
    MODE,
    SECRET,
    BASE_URL,
    IN_PROD=MODE==='prod',
    URL=`${BASE_URL}${PORT}`,
    DB="mongodb://localhost:27017/post-gql",
} = parsed;