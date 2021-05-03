import axios from "axios"

export class CovidDataServices {

    constructor() {
        this._axios = axios.create({ timeout: 3000 });
    }

    async getAll() {
        return await this._axios.get(`http://192.168.1.122:5003/api/covidata`);
    }

    async getByState(SG) {
        return await this._axios.get(`http://192.168.1.122:5003/api/covidata/${SG}`);
    }

}