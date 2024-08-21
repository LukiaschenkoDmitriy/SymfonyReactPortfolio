// This class provides methods for interacting with a RESTful API.
// It uses axios for making HTTP requests and handles authentication using JWT tokens.

import axios from 'axios';

export default class APIService {
    // API endpoint for authentication
    private static APIAUTHENDPOINT: string = 'auth';
    // Base URL of the API
    private static HOSTNAME: string = "https://127.0.0.1:8000/api";
    // User credentials for authentication
    private static USER_EMAIL: string = "a";
    private static USER_PASSWORD: string = "a";
    private static TOKEN: string = "";

    // Method to obtain a JWT token by sending a POST request to the authentication endpoint
    public async getToken() { 
        return await axios.post(`${APIService.HOSTNAME}/${APIService.APIAUTHENDPOINT}`, {
            email: APIService.USER_EMAIL,
            password: APIService.USER_PASSWORD,
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.data.token;
        });
    }

    // Generic method to make GET requests to the API endpoints
    // It includes the JWT token in the Authorization header
    public async getMethod(endpoint: string, headers: any) {
        if (APIService.TOKEN == "") APIService.TOKEN = await this.getToken();

        return axios.get(`${APIService.HOSTNAME}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...headers,
                "Authorization": `Bearer ${APIService.TOKEN}`
            }
        }).then((response) => {
            return response.data;
        });
    }

    // Methods to fetch specific resources from the API using the generic getMethod
    public async getSkills(id: string | null) {
        return await this.getMethod(`skills${id? `/${id}` : ''}`, {});
    }

    public async getProjects(id: string | null) {
        return await this.getMethod(`projects${id? `/${id}` : ''}`, {});
    }

    public async getExperiences(id: string | null) {
        return await this.getMethod(`experiences${id? `/${id}` : ''}`, {});
    }
}