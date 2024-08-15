import axios from 'axios';

export default class APIService {
    private static APIAUTHENDPOINT: string = 'auth';
    private static HOSTNAME: string = "https://127.0.0.1:8000/api";
    private static USER_EMAIL: string = "admin@gmail.com";
    private static USER_PASSWORD: string = "123123";

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

    public async getMethod(endpoint: string, headers: any) { 
        const token = await this.getToken();

        return axios.get(`${APIService.HOSTNAME}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...headers,
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            return response.data;
        });
    }

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