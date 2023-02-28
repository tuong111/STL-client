import axios from "axios";
export const baseHost = 'http://localhost:3001'
export const baseUrl = `${baseHost}/api`

const api = {
    call : () => {
        return axios.create({
            baseURL : baseUrl
        })
    }
}

export default api;