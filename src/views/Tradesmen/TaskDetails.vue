<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Task #{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
       <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content
          :pulling-icon="chevronDownCircleOutline"
          pulling-text="Pull to refresh"
          refreshing-spinner="circles"
          refreshing-text="Refreshing..."
        >
        </ion-refresher-content>
      </ion-refresher>

         <div class="loading" v-if="loading">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>

      <div v-if="!loading">
      <div class="ion-padding">
        <h2 class="title-1 text-capitalize">{{orderDetails.title}}</h2>
        <p class="text-capitalize">{{orderDetails.service_title}}</p>

        <ion-badge :color="getColor(orderDetails.status)">{{ orderDetails.status }}</ion-badge>
      </div>

      <div class="card">
        <div class="card-body">
          <p>Order Details</p>
          <p class="caption mb-1">
            Assigned Date: {{ formatDate(orderDetails.dateeng) }}
          </p>
          <p class="caption mb-1">
            Service Date : {{ formatDate(orderDetails.service_date) }}
          </p>
          <p class="caption mb-1">Address : {{ orderDetails.address }}</p>
          <p class="caption mb-1">Address : {{ orderDetails.phone }}</p>
          <p class="caption mb-1">
            Admin Remarks : {{ orderDetails.status_remarks }}
          </p>
        
        </div>
      </div>
      <div>
        <div class="card mt-3">
          <div class="card-body">
            <p>Worker Details</p>
            <p class="muted-caption" v-if="workers.length == 0">
              No Workers Assigned Yet
            </p>

            <table class="table small-table" v-if="workers.length > 0">
              <tr>
                <td>Assigned Date</td>
                <td>Work Title</td>
                <td>Worker Name</td>
                <td>Remarks</td>
              </tr>
              <tr v-for="worker in workers" :key="worker.title">
                <td>{{ formatDate(worker.assigned_date) }}</td>
                <td>{{ worker.title }}</td>
                <td>{{ worker.fullname }}</td>
                <td>{{ worker.remarks }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-body">
            <p>Task Logs</p>
            <p class="muted-caption" v-if="taskLogs.length == 0">
              No Task Logs
            </p>

            <table class="table small-table" v-if="taskLogs.length > 0">
              <tr v-for="log in taskLogs" :key="log.remarks">
                <td>{{ formatDate(log.updated_at) }}</td>
                <td>{{ log.remarks }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                 <ion-item>
            <ion-label position="floating">Tasks Updates</ion-label>
            <ion-input
              v-model="updateText"
              type="text"
              minlength="6"
            ></ion-input>
          </ion-item>
                  <ion-button color="primary" expand="full" class="mt-4" @click="updateTask" v-if="!saving" >Update Task</ion-button>

                    <ion-button color="primary" expand="full" class="mt-4" disabled v-if="saving"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>
            </div>
        </div>
        </div>
     
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/vue";
import moment from "moment";
import TasksApi from "./../../api/tasks";
import localStorage from "./../../mixins/localStorage";

export default {
  name: "Task Details",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonItem,
    IonInput,
    IonLabel,
  },
  data() {
    return {
      submitting: false,
      orderDetails: {},
      loading: false,
      
      saving: false,
      updateText: "",
      currentUser: {},
      currentItem: {},
      workers: [],
      taskLogs: [],
    
    };
  },
  mixins: [localStorage],
  methods: {
 getColor(val){
      if(val=="PENDING"){
        return 'medium'
      } else if(val=="APPROVED" || val=="COMPLETED"){
        return 'success'
      }else if(val == "REJECTED" || val=="CANCELLED"){
        return 'danger'
      }else {
        return 'medium'
      }
    },
    proceed() {},
    goBack() {
      this.$router.go(-1);
    },
    submitComplain() {
      let data = {
        order_id: this.$route.params.id,
        user_id: this.currentUser.id,
        remarks: this.complain,
        progress: "Not Seen",
      };
      this.submitting = true;
      TasksApi.postComplaints(data)
        .then((data) => {
          this.submitting = false;
          this.complain = "";
          this.getComplaints();
        })
        .catch((error) => {
          console.log("ERROR POSTING COMPLAINTS", error);
          this.submitting = false;
        });
    },
    updateTask(){
          this.saving = true;
             let data = {
                 order_id: this.$route.params.id,
                 remarks : this.updateText
             }
            TasksApi.postTaskProgress(data).then(data=>{
                
                this.saving = false;
                this.updateText = "";
                
                  
                   this.getTaskProgress();
            }).catch(error=>{
                console.log(error)
                this.saving = false;
            })

    },

     doRefresh(ev) {
      ev.target.complete();
      this.getOrderSummary(this.$route.params.id);
    },

   
 

    getWorkers() {
      TasksApi.getWorkers(this.$route.params.id)
        .then((data) => {
          this.workers = data.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTaskProgress() {
      TasksApi.getTaskProgress(this.$route.params.id)
        .then((data) => {
          this.taskLogs = data.data.data;
        })
        .catch((error) => {
          console.log("ORDER DETAILS", error);
        });
    },
    getOrderSummary(id){
      this.loading = true;
      TasksApi.getOrderById(id).then(data=>{
        this.orderDetails = data.data.data;
          this.loading = false;
      }).catch(error=>{
        this.loading = false;
        console.log(error);
      })
    },
    formatDate(value) {
      if (!value) return "";
      value = moment(value).format("MMM Do YYYY");
      return value;
    },
  },

  async mounted() {
    this.currentItem = this.$route.params.item
      ? JSON.parse(this.$route.params.item)
      : {};
    let response = await this.localStorage.get("esaraUser");
    this.currentUser = response.profile;

      this.getOrderSummary(this.$route.params.id);
    this.getTaskProgress();
    this.getWorkers();
 
    
  },


  created() {


    this.emitter.on("refreshApi", () => {
      this.getOrderSummary(this.$route.params.id);
    this.getTaskProgress();
    this.getWorkers();
    });
  },
};
</script>

<style scoped>
ion-content {
  --ion-background-color: #f5f5f5;
}
.banner {
  width: 100%;
  height: 200px;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>