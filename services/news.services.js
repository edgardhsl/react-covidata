import axios from "axios"

export class NewsServices {

    constructor() {
        this._axios = axios.create();
    }

    async get(id) {
        return await this._axios.get(`news/${id}`);
    }

    async getAll(page, size) {
            return await this._axios.get(`http://192.168.1.122:505/api/news?${page ? `&page=` + page : ''}${page ? `&size=` + size : ''}`);
    }


}