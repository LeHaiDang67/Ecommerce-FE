import axios from 'axios';

const requestApi = async (method, endpoint, data = "") => {
    return await fetch({
        method: method,
        url: `${process.env.REACT_APP_API_URL}${endpoint}`,
        data: data && ""
    });
}

export default requestApi;

