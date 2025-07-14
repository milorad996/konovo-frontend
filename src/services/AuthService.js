import HttpService from "./HttpService";

class AuthService extends HttpService {
    constructor() {
        super();
        this.login = this.login.bind(this);
    }

    async login(credentials) {
        const { data } = await this.client.post("/login", credentials);
        return data;
    }



}

const authService = new AuthService();

export default authService;