import axios from "axios";
export const baseHost = 'https://pib-server.onrender.com'
export const baseUrl = `${baseHost}/api`

const api = {
    call: () => {
        return axios.create({
            baseURL: baseUrl
        })
    }
}

export default api;