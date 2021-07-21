import axios from "axios";


import { config } from "./config";
import router from "./../router/index";

import { Storage } from "@ionic/storage";
let localStorage = new Storage()
localStorage.create();

const BaseUrl = config.BaseUrl + "/api/app/";
const TmpUrl = config.BaseUrl + "/api/";
const apiClient = axios.create({
    timeout: 15000,
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});




// /401 check
apiClient.interceptors.response.use(function (response) {
    return response
}, function (error) {
    console.log("error",error)
    if (error.response.status === 401) {

         router.push('/sign-in')
    }
    return Promise.reject(error.response.data)
})

//   sending headers
apiClient.interceptors.request.use(async function (config) {
    let localdata = await localStorage.get("esaraUser");
    let token = "";
    if (localdata) {
        
        token = 'Bearer ' + localdata.token.token;

    }
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});



// const BaseUrl = "https://esara.herokuapp.com/api/app/";




function getBanner() {
    // https://backend.esara.com.np/api/app/promoscreens
    return apiClient.get(BaseUrl + "promoscreens");
}


function getCategories() {
    return apiClient.get(BaseUrl + "taskcategories");
}



function getSummary() {
    return apiClient.get(BaseUrl + "summary", {
        headers: {

        }
    });
}



function getUserDocuments() {
    return apiClient.get(BaseUrl + "documents", {
        headers: {

        }
    });
}

function uploadDocuments(data) {
    return apiClient.post(BaseUrl + "documents/upload", data, {
        headers: {

        }
    });
}




function getProfile(id) {
    return apiClient.get(BaseUrl + "profile", {
        headers: {

        }
    })
}

function editProfile(data, id) {

    return apiClient.put(BaseUrl + "profile", data, {
        headers: {

        }
    })
}


function getNotifications() {
    return apiClient.get(BaseUrl + "notifications", {
        headers: {

        }
    });

}






function assignTask(data) {
    return apiClient.post(BaseUrl + "assign-worker", data, {
        headers: {

        }
    })
}


function getTraining() {
    return apiClient.get(BaseUrl + "trainings");
}

function getTrainingById(id) {
    return apiClient.get(BaseUrl + "trainings/" + id);
}

function bookTraining(data) {
    return apiClient.post(BaseUrl + "trainingorders", data, {
        headers: {

        }
    })
}

function getTrainingOrders() {
    return apiClient.get(BaseUrl + "trainingorders/mine", {
        headers: {

        }
    })
}


function getServices() {
    return apiClient.get(BaseUrl + "services");
}

function getServiceOrders() {
    return apiClient.get(BaseUrl + "serviceorders");
}

function editServiceOrders(id, data) {
    return apiClient.put(BaseUrl + "serviceorders/" + id, data, {
        headers: {

        }
    });
}

function getMyOrders() {
    return apiClient.get(BaseUrl + "orders")
}

function bookService(data) {
    return apiClient.post(BaseUrl + "orders", data, {
        headers: {

        }
    });
}

function submitCertification(data) {
    return apiClient.post(BaseUrl + "certificationorders", data);
}

function getCertifications() {
    return apiClient.get(BaseUrl + "certificationorders");
}

function getTaskProgress(id) {
    return apiClient.get(BaseUrl + "orders/progress/" + id, {
        headers: {

        }
    })
}

function postTaskProgress(data) {
    return apiClient.post(BaseUrl + "orders/progress/", data, {
        headers: {

        }
    })
}

function editNotification(id) {
    let data = {
        is_seen: 1
    }
    console.log("ID", id)
    return apiClient.put(BaseUrl + "notifications/" + id, data, {
        headers: {

        }
    })
}

function uploadImage(data) {
    return apiClient.post(TmpUrl + "upload", data, {
        headers: {

        }
    })
}

function getMyTasks(id) {
    return apiClient.get(BaseUrl + "works", {
        headers: {

        }
    });
}

function postComplaints(data) {
    console.log(data);
    return apiClient.post(BaseUrl + "complaints", data, {
        headers: {

        }
    });
}

function getComplaints(id) {
    return apiClient.get(BaseUrl + "complaints/task/" + id, {
        headers: {

        }
    })
}


function getWorkers(id) {
    return apiClient.get(BaseUrl + "orders/workers/" + id, {
        headers: {

        }
    })
}


function getInvoice(id) {
    return apiClient.get(BaseUrl + "order_financials/" + id);
}

function checkIn() {
    return apiClient.post(BaseUrl + "attendance/signin", {}, {
        headers: {

        }
    })
}

function checkOut() {
    return apiClient.post(BaseUrl + "attendance/signout", {}, {
        headers: {

        }
    })
}

function getAttendance() {
    return apiClient.get(BaseUrl + "attendance", {
        headers: {

        }
    })
}




export default {
    checkIn,
    checkOut,
    getAttendance,

    getWorkers,
    getInvoice,
    getBanner,
    getCategories,

    getSummary,

    getUserDocuments,
    uploadDocuments,


    getProfile,
    editProfile,
    getNotifications,



    assignTask,

    getTraining,
    bookTraining,
    getTrainingOrders,
    getTrainingById,
    getServices,
    getServiceOrders,
    bookService,
    submitCertification,
    getCertifications,
    getMyOrders,
    getTaskProgress,
    getMyTasks,
    editNotification,
    postTaskProgress,
    editServiceOrders,
    postComplaints,
    getComplaints,

    uploadImage
}

