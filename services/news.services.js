import axios from "axios"
import config from "../assets/config.json";

export class NewsServices {

    constructor() {
        this._axios = axios.create({
            baseURL: `http://${config.host}:${config.services.news.port}`,
            timeout: 3000
        });
    }

    get(id) {
        return this._axios.get(`${config.services.news.api}/${id}`);
    }

    async getAll(page, size) {
            return await this._axios.get(`${config.services.news.api}?${page ? `&page=` + page : ''}${page ? `&size=` + size : ''}`);
    }


}