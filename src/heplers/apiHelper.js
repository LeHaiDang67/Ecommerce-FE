import axios from 'axios';

const requestApi = (method, endpoint, data) => {
    let headers = {
        "Content-Type": "application/json",
    };
    return axios({
        method: method,
        url: `${process.env.REACT_APP_API_URL}${endpoint}`,
        data: data && "",
        headers
    });
}

export default requestApi;

