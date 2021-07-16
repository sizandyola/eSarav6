<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
          <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Order #{{currentItem.id}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" >
    
      <div class="ion-padding">
        <h2 class="title-1">Utilities Mangement Services</h2>

        
        <ion-badge color="medium">{{currentItem.status}}</ion-badge>
      </div>


        <div class="card">
            <div class="card-body">
                <p>Order Details</p>
              <p class="caption mb-1">Ordered Date: {{formatDate(currentItem.dateeng)}} </p>
            <p class="caption mb-1">Service Date : {{formatDate(currentItem.service_date)}} </p>
            <p class="caption mb-1">Address : {{currentItem.address}}</p>
            <p class="caption mb-1">Admin Remarks : {{currentItem.status_remarks}}</p>
                

            </div>

        </div>
      <div>

              <div class="card mt-3">
            <div class="card-body">
                <p>Worker Details</p>
                <p class="muted-caption" v-if="workers.length==0">No Workers Assigned Yet</p>
                
                <table class="table small-table" v-if="workers.length>0">
                  <tr>
                    <td>Assigned Date </td>
                    <td>Work Title </td>
                    <td>Worker Name </td>
                    <td>Remarks </td>
                  </tr>
                  <tr v-for="worker in workers" :key="worker.title">
                    <td>{{formatDate(worker.assigned_date)}} </td>
                    <td>{{worker.title}} </td>
                    <td>{{worker.fullname}} </td>
                    <td>{{worker.remarks}} </td>
                    
                    </tr>
                </table>

            
            </div>

        </div>
      

              <div class="card  mt-3">
            <div class="card-body">
                <p>Task Logs</p>
                <p class="muted-caption" v-if="taskLogs.length==0">No Task Logs</p>

                  <table class="table small-table" v-if="taskLogs.length>0">
                    <tr v-for="log in taskLogs" :key="log.remarks">
                      <td>{{log.dateeng}}</td>
                      <td>{{log.remarks}}</td>
                    </tr>
                    </table>

             

            </div>

        </div>
      

              <div class="card  mt-3">
            <div class="card-body">
                <p>Your Complains</p>
                <p class="muted-caption" v-if="complainList.length==0">No Submitted Complains</p>
                    <table class="table small-table" v-if="complainList.length>0">
                     
                    <tr v-for="com in complainList" :key="com.remarks">
                      
                      <td>{{com.remarks}}</td>
                      <td>{{com.progress}}</td>
                    </tr>
                    </table>
                

            </div>

        </div>

           <div class="card  mt-3">
            <div class="card-body">
              
                  <ion-item>
            <ion-label position="floating">Complain</ion-label>
            <ion-input v-model="complain" type="text"></ion-input>
          </ion-item>
               <ion-button color="success" expand="full" class="mt-4" @click="submitComplain"  v-if="!submitting"
            >Submit</ion-button
          >
           <ion-button color="success" expand="full" class="mt-4" disabled v-if="submitting"
            >  <ion-spinner name="crescent" color="light"></ion-spinner></ion-button
          >
        
              </div>
</div>
      


       
      
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem,IonInput,IonLabel } from '@ionic/vue';
import moment from "moment";
import TasksApi from "./../../api/tasks";
import localStorage from "./../../mixins/localStorage";

export default  {
  name: 'Tab4',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonItem,IonInput,IonLabel },
  data(){
    return{
      submitting: false,
      complain: "",
      currentUser : {},
      currentItem : {},
      workers: [],
      taskLogs: [],
      complainList: {
        complaint:[]
      },
    }
  },
  mixins: [localStorage],
  methods:{
    proceed(){

    },
    goBack(){
      this.$router.go(-1);
    },
     submitComplain(){
                   


            let data = {
                order_id : this.currentItem.id,
                user_id : this.currentUser.id,
                remarks : this.complain,
                progress : "Not Seen"
            }
            this.submitting = true;
            TasksApi.postComplaints(data).then(data=>{
                
                this.submitting = false;
                this.complain = "";
                 this.getComplaints();
            }).catch(error=>{
                console.log("ERROR POSTING COMPLAINTS",error)
                this.submitting = false;
            })
        },
       getComplaints(){
              TasksApi.getComplaints(this.currentItem.id).then(data=>{
            
            this.complainList = data.data.data.complaint;
            console.log("COMPLAINTS",JSON.stringify(this.complainList))
        }).catch(error=>{
            console.log("ORDER DETAILS",error);
        })
        },

        getWorkers(){
            TasksApi.getWorkers(this.currentItem.id).then(data=>{
                this.workers = data.data.data;
                
            }).catch(error=>{
                console.log(error);
            })
        },
        getTaskProgress(){
           TasksApi.getTaskProgress(this.currentItem.id).then(data=>{
            this.taskLogs = data.data.data;
        }).catch(error=>{
            console.log("ORDER DETAILS",error)
        })
        },
      formatDate(value){
            if (!value) return ''
        value = moment(value).format("MMM Do YYYY");
        return value;
    
          }
  },


  async mounted(){
    this.currentItem = this.$route.params.item?JSON.parse(this.$route.params.item): {};
    let response = await this.localStorage.get('esaraUser');
    this.currentUser = response.profile;
    
    this.getTaskProgress();
    this.getWorkers();
    this.getComplaints();
  }
}
</script>

<style scoped>
ion-content{

    --ion-background-color:#f5f5f5;
}
.banner{
  width: 100%;
  height: 200px;
}

.banner img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>