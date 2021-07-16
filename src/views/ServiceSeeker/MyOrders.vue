<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>My Orders</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="loading" v-if="loading">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
      <ion-list v-if="!loading">
            <ion-item v-for="order in orders" :key="order.id" @click="clickHandler(order)">
         
          <ion-label>
           <div>
             <h2 class="title mb-2">{{order.title}}</h2>
            <p class="caption">Ordered Date: {{formatDate(order.dateeng)}} </p>
            <p class="caption">Service Date : {{formatDate(order.service_date)}} </p>
            <p class="caption">Address : {{order.address}}</p>
            <p class="caption">Admin Remarks : {{order.status_remarks}}</p>
          </div>
          </ion-label>
            <div class="">
              
              <!-- <ion-badge color="medium">{{order.status}}</ion-badge> -->
            </div>
        </ion-item>
        
      
      </ion-list>
      </ion-content>
  </ion-page>
</template>

<script >
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import TasksApi from "./../../api/tasks";
import localStorage from "./../../mixins/localStorage";
import moment from "moment";

export default {
  name: "Tab2",
  mixins: [localStorage],
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList
  },
  data(){
    return{
      orders: [],
      loading: false,
    }
  },

  methods:{
    clickHandler(item){
     
      this.$router.push({name: "orderDetails",params:{item:JSON.stringify(item)}})
    },
    async testClick(){
      let test = await TasksApi.getMyOrders().then(data=>{
      conosle.log(test);
    }).catch(error=>{
      console.log(error);
    })
    },

      formatDate(value){
            if (!value) return ''
        value = moment(value).format("MMM Do YYYY");
        return value;
    
          },
        getMyOrders(){
            this.loading = true;
     TasksApi.getMyOrders().then(data=>{ 
      this.orders = data.data.data;
      this.loading = false;
    }).catch(error=>{
      console.log(error);
    })
        }
  },

  async mounted(){
    this.getMyOrders();
  },
  created(){
      this.emitter.on("refreshApi", () => {
      this.getMyOrders();
    });
  }
};
</script>