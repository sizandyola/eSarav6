<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>My Tasks</ion-title>

         <ion-buttons slot="end">
          <i
            class="fas fa-redo pe-3"
            style="font-size: 21px"
            @click="getMyTasks"
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
            <p class="caption">Assigned Date: {{formatDate(order.assigned_date)}} </p>
            <p class="caption">Service Date : {{formatDate(order.service_date)}} </p>
            <p class="caption">Address : {{order.address}}</p>
            <p class="caption text-wrap">Admin Remarks : {{order.remarks}}</p>
          </div>
          </ion-label>
            <div class="">
              
              <ion-badge :color="getColor(order.status)">{{order.status}}</ion-badge>
            </div>
        </ion-item>

        <h4 class="muted-title text-center mt-3 ion-padding" v-if="!loading && orders.length==0">You Have No Assigned Tasks Yet</h4>
        
      
      </ion-list>
      </ion-content>
  </ion-page>
</template>

<script>
import { IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList, IonRefresher, IonRefresherContent } from '@ionic/vue';

import localStorage from "./../../mixins/localStorage";
import TasksApi from "./../../api/tasks";
import moment from "moment";

export default  {
  name: 'Tab3',
  mixins: [localStorage],
  components: { IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList, IonRefresher, IonRefresherContent
  
  },
  data(){
    return{
      currentUser: {},
      orders: [],
      loading: true,
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
     
      // this.$router.push({name: "taskDetails",params:{item:JSON.stringify(item)}})
      this.$router.push({path:"/task-details/"+item.order_id});
    },
    getMyTasks(){
      this.loading = true;
       TasksApi.getMyTasks(this.currentUser.id).then(data=>{
            this.orders = data.data.data;
            this.loading = false;
            
        }).catch(error=>{
            console.log(error);
            this.loading = false;
        })
    },
     formatDate(value){
            if (!value) return ''
        value = moment(value).format("MMM Do YYYY");
        return value;
    
          },
              doRefresh(ev){
            ev.target.complete();
            this.getMyTasks();
            // this.getMyOrders();
        }
  },
  async mounted(){
     let response = await this.localStorage.get('esaraUser');
    this.currentUser = response.profile;
    this.getMyTasks();
  },

   created(){
      this.emitter.on("refreshApi", () => {
      this.getMyTasks();
    });
  }
}
</script>


<style scoped>

</style>