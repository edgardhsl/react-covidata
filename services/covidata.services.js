import axios from "axios"
import config from "../assets/config.json";

export class CovidDataServices {

    constructor() {
        this._axios = axios.create({
            baseURL: `http://${config.host}:${config.services.covidata.port}`,
            timeout: 3000
        });
    }

    async getAll() {
        return await this._axios.get(`${config.services.covidata.api}`);
    }

    async getByState(SG) {
        return await this._axios.get(`${config.services.covidata.api}/${SG}`);
    }

}