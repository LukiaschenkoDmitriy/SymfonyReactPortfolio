// This class provides methods for interacting with a RESTful API.
// It uses axios for making HTTP requests and handles authentication using JWT tokens.

import ContactEntity from '@data/ContactEntity';
import axios, { HttpStatusCode } from 'axios';

export default class APIService {
    private static HOSTNAME: string = "https://127.0.0.1:8000/api";

    // Generic method to make GET requests to the API endpoints
    public async getMethod(endpoint: string, headers: any) {

        return await axios.get(`${APIService.HOSTNAME}/${endpoint}`, {
            headers: {
            	"Accept": "application/json",
                "Content-Type": "application/json; charset=UTF-8",
                ...headers,
            }
        }).then(async (response): Promise<any> => {
            return response.data;
        });
    }

    public async sendContact(contact: ContactEntity, recaptcha_token: string) {
        return await axios.post(`${APIService.HOSTNAME}/contact`, {
            contact: contact,
            recaptcha_token: recaptcha_token
        }, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json"
            }
        }).then((response) => {
            return response;
        });
    }
}
