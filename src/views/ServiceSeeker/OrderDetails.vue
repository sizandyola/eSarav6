<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Order #{{ currentItem.id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="ion-padding">
        <h2 class="title-1">{{ currentItem.service_title }}</h2>

        <ion-badge :color="getColor(currentItem.status)">{{ currentItem.status }}</ion-badge>
      </div>
  <ion-segment @ionChange="segmentChanged($event)" v-model="selectedTab">
    <ion-segment-button value="0">
      <ion-label>Summary</ion-label>
    </ion-segment-button>
    <ion-segment-button value="1">
      <ion-label>Financials</ion-label>
    </ion-segment-button>
  </ion-segment>

  <div class="" v-if="selectedTab==0">
      <div class="card">
        <div class="card-body">
          <p>Order Details</p>
          <p class="caption mb-1">
            Ordered Date: {{ formatDate(currentItem.dateeng) }}
          </p>
          <p class="caption mb-1">
            Service Date : {{ formatDate(currentItem.service_date) }}
          </p>
          <p class="caption mb-1">Address : {{ currentItem.address }}</p>
          <p class="caption mb-1">
            Admin Remarks : {{ currentItem.status_remarks }}
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
                <td>{{ log.dateeng }}</td>
                <td>{{ log.remarks }}</td>
              </tr>
            </table>
          </div>
        </div>

        
      

        <div class="card mt-3">
          <div class="card-body">
            <p>Your Complains</p>
            <p class="muted-caption" v-if="complainList.length == 0">
              No Submitted Complains
            </p>
            <table class="table small-table" v-if="complainList.length > 0">
              <tr v-for="com in complainList" :key="com.remarks">
                <td>{{ com.remarks }}</td>
                <td>{{ com.progress }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-body">
            <ion-item>
              <ion-label position="floating">Complain</ion-label>
              <ion-input v-model="complain" type="text"></ion-input>
            </ion-item>
            <ion-button
              color="success"
              expand="full"
              class="mt-4"
              @click="submitComplain"
              v-if="!submitting"
              >Submit</ion-button
            >
            <ion-button
              color="success"
              expand="full"
              class="mt-4"
              disabled
              v-if="submitting"
            >
              <ion-spinner name="crescent" color="light"></ion-spinner
            ></ion-button>
          </div>
        </div>
      </div>
      </div>
      <div class="" v-if="selectedTab==1">
          <div class="card">
          <div class="card-body">
            <p>Financials</p>
            <p class="muted-caption" v-if="financials.length == 0">
              No Financial Records
            </p>
            
            <div v-if="financials.length > 0">
              <div class="financial-item card" v-for="log in financials" :key="log.remarks">
                <div class="card-body">
                    <p class="caption mb-1 ">
           <ion-badge class=" py-2" :color="log.payment_type=='RECEIVABLES'?'danger':'success'"> {{log.payment_type}}</ion-badge>
          </p>
                <p class="caption mb-1">
                 Invoice Id : {{log.id}}
          </p>
           <p class="caption mb-1">
           Transaction Date : {{formatDate(log.transaction_date)}}
          </p>
           <p class="caption mb-1">
            Payment Mode : {{log.mode}}
          </p>
         
           <p class="caption mb-1">
           Payment Amount : {{log.amount}}
          </p>
           <p class="caption mb-1">
           Remarks : {{log.remarks}}
          </p>

           <ion-button
              color="primary"
              expand="full"
              class="mt-4"
              @click="paymentModal(log)"
              v-if="log.payment_type=='RECEIVABLES'"
              
            >Make Payment</ion-button>
          
          </div>
              </div>
            </div>

            <!-- <table class="table small-table" v-if="financials.length > 0">
              <tr v-for="log in financials" :key="log.remarks">
                <td>test</td>
                <td>test</td>
                 <td>test</td>
                <td>test</td>
                 <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
            </table> -->
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
  IonBadge,
  modalController,
   IonSegment, IonSegmentButton 
} from "@ionic/vue";
import moment from "moment";
import TasksApi from "./../../api/tasks";
import localStorage from "./../../mixins/localStorage";
import PaymentModal from "./components/MakePaymentModal.vue";

export default {
  name: "Tab4",
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
    IonBadge,
    IonSegment, IonSegmentButton 
  },
  data() {
    return {
      submitting: false,
      selectedTab: 0,
      complain: "",
      currentUser: {},
      currentItem: {},
      workers: [],
      taskLogs: [],
      financials: [],
      complainList: {
        complaint: [],
      },
      modal: "",
    };
  },
  mixins: [localStorage],
  methods: {
    getColor(val){
      if(val=="PENDING"){
        return 'medium'
      } else if(val=="APPROVED"){
        return 'success'
      }else if(val == "REJECTED"){
        return 'danger'
      }else {
        return 'medium'
      }
    },
    proceed() {},
    goBack() {
      this.$router.go(-1);
    },
    segmentChanged(ev){
      console.log(ev);
    },
    submitComplain() {
      let data = {
        order_id: this.currentItem.id,
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
    getComplaints() {
      TasksApi.getComplaints(this.currentItem.id)
        .then((data) => {
          this.complainList = data.data.data.complaint;
          console.log("COMPLAINTS", JSON.stringify(this.complainList));
        })
        .catch((error) => {
          console.log("ORDER DETAILS", error);
        });
    },

    getWorkers() {
      TasksApi.getWorkers(this.currentItem.id)
        .then((data) => {
          this.workers = data.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTaskProgress() {
      // this.currentItem.id
      TasksApi.getTaskProgress(93)
        .then((data) => {
          this.taskLogs = data.data.data;
        })
        .catch((error) => {
          console.log("ORDER DETAILS", error);
        });
    },
    getFinanicals(){
       TasksApi.getInvoice(this.currentItem.id)
        .then((data) => {
          this.financials = data.data.data;
        })
        .catch((error) => {
          console.log("financials", error);
        });
    },
    formatDate(value) {
      if (!value) return "";
      value = moment(value).format("MMM Do YYYY");
      return value;
    },
    async paymentModal(item){
          this.modal = await modalController
        .create({
          component: PaymentModal,
          cssClass: 'my-custom-class',
          componentProps: {
            details: {
              orderId : this.currentItem.id,
              title: this.currentItem.title,
              remarks: item.remarks,
            }
          },
        })
      return this.modal.present();
    },
  },

  async mounted() {
    this.currentItem = this.$route.params.item
      ? JSON.parse(this.$route.params.item)
      : {};
    let response = await this.localStorage.get("esaraUser");
    this.currentUser = response.profile;

    this.getTaskProgress();
    this.getWorkers();
    this.getComplaints();
    this.getFinanicals();
  },
  created(){
      this.emitter.on("dismissModal", () => {
       this.modal.dismiss().then(() => {
                this.modal = null;
            });
    });
  }
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