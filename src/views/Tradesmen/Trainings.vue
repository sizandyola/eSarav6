<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>My Trainings</ion-title>
      </ion-toolbar>
    </ion-header>
    
     <ion-content :fullscreen="true">
      <div class="loading" v-if="loading">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
      <ion-list v-if="!loading">
            <ion-item v-for="order in trainingOrders" :key="order.id" @click="clickHandler(order)">
         
          <ion-label>
           <div>
             <h2 class="title mb-2">{{order.title}}</h2>
            <p class="caption">Training Date: {{formatDate(order.training_start_date)}} </p>
            <p class="caption">Is Enrolled: {{checkBoolean(order.is_enrolled)}} </p>
            <p class="caption">Preferred Shift : {{order.preffered_time_shift}}</p>
            <p class="caption">Status : {{order.status}}</p>
            <p class="caption">Admin Remarks : {{order.admin_remarks}}</p>
          </div>
          </ion-label>
            <div class="">
              
              <!-- <ion-badge color="medium">{{order.status}}</ion-badge> -->
            </div>
        </ion-item>

        <h4 class="muted-title text-center mt-3 ion-padding" v-if="!loading && trainingOrders.length==0">You Have No Training Orders  Yet</h4>
        
      
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
  IonList } from '@ionic/vue';

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
  IonList },
  data(){
    return{
      currentUser: {},
      trainingOrders: [],
      loading: false,
    }
  },

  methods:{
     checkBoolean(val){
            if(val==0){
                return "Yes"
            }else{
                return "False"
            }
        },
  
     formatDate(value){
            if (!value) return ''
        value = moment(value).format("MMM Do YYYY");
        return value;
    
          },

          getTrainingOrders(){
            this.loading = true;
             TasksApi.getTrainingOrders().then(data=>{
               this.loading = false;
            this.trainingOrders = data.data.data;
            
        }).catch(error=>{
          this.loading = false;
            console.log(error);
        })
          }
  },
  async mounted(){
     let response = await this.localStorage.get('esaraUser');
    this.currentUser = response.profile;
    this.getTrainingOrders();
  }
}
</script>


<style scoped>

</style>

