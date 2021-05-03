import axios from "axios"

export class NewsServices {

    constructor() {
        this._axios = axios.create({ timeout: 3000 });
    }

    get(id) {
        return this._axios.get(`news/${id}`);
    }

    async getAll(page, size) {
            return await this._axios.get(`http://192.168.1.122:5001/api/news?${page ? `&page=` + page : ''}${page ? `&size=` + size : ''}`);
    }


}