const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

module.exports =  {
    API_KEY,
    API_URL
};