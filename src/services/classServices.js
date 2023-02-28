
import api from './index';
const classServices = {
    addClass : async (token,input) => {
        const {code,name,note,mentor} = input
        return new Promise((resolve,reject)=> {
            api.call().post(`/class/`,{
                code : code,
                name : name,
                note : note,
                mentor : mentor
            },{
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    getListClass : async (token) => {
        return new Promise((resolve,reject) => {
            api.call().get(`/class/`,{
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    getClass : async (token,id) => {
        return new Promise((resolve,reject)=> {
            api.call().get(`/class/${id}`,{
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    addStudent : async(token,id,listStudent) => {
        console.log(listStudent)
        return new Promise((resolve,reject) => {
            api.call().post(`/class/addStudent/${id}`,{
                listStudent : listStudent
            },{
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    }
}

export default classServices