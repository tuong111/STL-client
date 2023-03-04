import api from './index'

const userServices = {

    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            api.call().post(`/auth/login`,
                {
                    email: email,
                    password: password
                }).then(
                    res => {
                        const { data } = res
                        resolve(data)
                    }
                )
                .catch(error => {
                    reject(error)
                })
        })
    },
    register : async (name,email,password, role, token) => {
        return new Promise((resolve,reject)=> {
            api.call().post(`/auth/register`, {
                name : name,
                email : email,
                password : password,
                role : role
            },{
                headers : {Authorization : `Bearer ${token}`}
            }).then(
                res => {
                    const {data} = res
                    resolve(data)
                }
            ).catch(error => reject(error))
        })
    },
    getListUsers : async (token,role) => {
        return new Promise((resolve, reject) => {
            api.call().get(`/auth/listuser?role=${role}`,{
                headers : {Authorization : `Bearer ${token}`}
            }).then(
                res => {
                    const {data} = res 
                    resolve(data)
                }
            ).catch(error => reject(error))
        })
    },
    getUserInfoById : async (userID,token) => {
        return new Promise((resolve,reject)=> {
            api.call().get(`/auth/${userID}`, {
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
        
    },
    updateNameRole : async (token,userID,newName,newRole) => {
        return new Promise((resolve, reject) => {
            api.call().put(`/auth/updatenamerole/${userID}`,{
                newName : newName,
                newRole : newRole
            },{
                headers : {Authorization : `Bearer ${token}`}
            }).then(
                res => {
                    const {data} = res 
                    resolve(data)
                }
            ).catch(error => reject(error))
        })
    },
    deleteUser : async (token, userID) => {
        return new Promise((resolve,reject)=> {
            api.call().delete(`/auth/${userID}`,{
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    }
    ,
    updateDownloadCount : async (token,userID) => {
        return new Promise((resolve,reject)=> {
            api.call().post(`/auth/updatedownload`,{
                userID : userID
            },{
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    }
}


export default userServices;