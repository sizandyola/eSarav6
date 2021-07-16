import axios from 'axios';
import { Storage } from "@ionic/storage";
let localStorage =new Storage()
localStorage.create();





export default function setup() {
    axios.interceptors.request.use(async function(config) {
        let localdata = await localStorage.get("esaraUser");
        let token = "";
        if(localdata){
            token = localdata.token.token;
            console.log("TOKEN",token);
        }
        
        if(localdata){
        //  token = JSON.parse(appSettings.getString("loggedInUser"));
        token = "asdasd"
        }
        
        if(token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });
}