import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://tech-cash-challenge-api.herokuapp.com'
});