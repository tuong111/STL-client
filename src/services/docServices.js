
import api from './index';
const docServices = {
    addDocType : async (token,input) => {
        const {code,name,note,menu} = input
        return new Promise((resolve,reject)=> {
            api.call().post(`/file/show/doctype`,{
                code : code,
                name : name,
                note : note,
                menu : menu
            },{
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    getAllDocType : async (req,res) => {
        return new Promise((resolve,reject) => {
            api.call().get('/file/show/doctype')
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    },
    addDocument : async (token,input) => {
        const {code,name,type, note} = input
        return new Promise((resolve,reject)=> {
            api.call().post(`/file/show/doc`, {
                code : code,
                name : name,
                type : type,
                note : note
            }, {
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    getAllDoc : async () => {
        return new Promise((resolve,reject) => {
            api.call().get('/file/show/doc')
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    getDocByType : async (docTypeID) => {
        return new Promise((resolve, reject) => {
            api.call().get('/file/show/doc/' + docTypeID)
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    countSeen : async (id) => {
        return new Promise((resolve,reject) => {
            api.call().post('/file/show/doc/count', {
                id : id
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    countDown : async (id) => {
        return new Promise((resolve,reject) => {
            api.call().post('/file/show/doc/downcount', {
                id : id
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    // Menu API : 
    addNewMenu : async (token, input ) => {
        const {code,name,note} = input
        return new Promise((resolve,reject)=> {
            api.call().post(`/menu`,{
                code : code,
                name : name,
                note : note,
            },{
                headers : {Authorization : `Bearer ${token}`}
            })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    },
    getAllMenu : async (token) => {
        return new Promise((resolve,reject) => {
            api.call().get('/menu')
            .then(res => resolve(res.data))
            .catch(err => reject(err))
        })
    }
}

export default docServices