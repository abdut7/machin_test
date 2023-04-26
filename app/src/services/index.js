import { instance } from './config'

const getQuestens = () => {
    return new Promise((resolve,reject)=>{
        instance.get('get_questens', {
            params: { }
        })
        .then(function (response) {
            console.log(response);

            resolve(response.data);
        })
        .catch(function (error) {
            console.log(error);
            reject(error);
        })
    })
}


const createFeddback = (data) => {
    return new Promise((resolve,reject)=>{
        instance.post('feedback', data)
        .then(function (response) {
            console.log(response);
            resolve(response.data);
        })
        .catch(function (error) {
            console.log(error);
            reject(error);
        })
    })
}

export {
    getQuestens,
    createFeddback
}