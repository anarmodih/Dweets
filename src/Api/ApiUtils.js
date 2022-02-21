import axios from "axios";
import LocalStorage from "./LocalStorage";
const API_URL = "http://8d59-103-250-139-223.ngrok.io/";

const ApiUtils = {
    // login
    login: function (payload) {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };
        return axios.post(API_URL + "v1/user/login", payload, {
            headers: headers,
        })
            .then(response => {
                console.log("Login an time par nu resoinse in api ut", response.data)
                if (response && response.data) {
                    const responses = {
                        data: response.data,
                        status: response.status
                    }
                    return responses
                }
            })
            .catch(error => {
                if (error && error.response && error.response.data) {
                    const errorthrow = {
                        error: error.response.data,
                        status: error.response.status
                    }
                    throw errorthrow
                }
            });
    },
}
export default ApiUtils;