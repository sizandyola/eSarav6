<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>My Orders</ion-title>


          <ion-buttons slot="end">
          <i
            class="fas fa-redo pe-3"
            style="font-size: 21px"
            @click="getMyOrders"
          ></i>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

     
    <ion-content :fullscreen="true">
       <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content
        :pulling-icon="chevronDownCircleOutline"
        pulling-text="Pull to refresh"
        refreshing-spinner="circles"
        refreshing-text="Refreshing...">
      </ion-refresher-content>
    </ion-refresher>
      <div class="loading" v-if="loading">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
      <ion-list v-if="!loading">
            <ion-item v-for="order in orders" :key="order.id" @click="clickHandler(order)">
         
          <ion-label>
           <div>
             <h2 class="title mb-2 text-capitalize">{{order.title}}</h2>
            <p class="caption">Ordered Date: {{formatDate(order.dateeng)}} </p>
            <p class="caption">Service Date : {{formatDate(order.service_date)}} </p>
            <p class="caption">Address : {{order.address}}</p>
            <p class="caption">Admin Remarks : {{order.status_remarks}}</p>
          </div>
          </ion-label>
            <div class="">
              
              <ion-badge :color="getColor(order.status)">{{order.status}}</ion-badge>
            </div>
        </ion-item>
        
      
      </ion-list>
      <h4 class="muted-title text-center mt-3 ion-padding" v-if="!loading && orders.length==0">You Have No Orders Yet</h4>
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
  IonList,
  IonRefresher,
  IonRefresherContent
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
    IonList,
    IonRefresher,
  IonRefresherContent
  },
  data(){
    return{
      orders: [],
      loading: false,
    }
  },

  methods:{
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
    clickHandler(item){
     
      // this.$router.push({name: "orderDetails",params:{item:JSON.stringify(item)}})
      this.$router.push({path:"/order-details/"+item.id})
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
        },

        doRefresh(ev){
            ev.target.complete();
            this.getMyOrders();
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