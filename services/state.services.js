import axios from "axios"
import config from "../assets/config.json";

export class StateServices {

    constructor() {
        this._axios = axios.create({
            baseURL: `http://${config.host}:${config.services.states.port}`,
            timeout: 3000
        });
    }

    async getAll() {
        return await this._axios.get(`${config.services.states.api}`);
    }


}