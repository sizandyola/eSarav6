<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Financials</ion-title>

         <ion-buttons slot="end">
          <i
            class="fas fa-redo pe-3"
            style="font-size: 21px"
            @click="getFinancials"
          ></i>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
     <ion-content :fullscreen="true">
      <div class="loading" v-if="loading">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
       <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content
        :pulling-icon="chevronDownCircleOutline"
        pulling-text="Pull to refresh"
        refreshing-spinner="circles"
        refreshing-text="Refreshing...">
      </ion-refresher-content>
    </ion-refresher>
      <ion-list v-if="!loading">

            <ion-item v-for="fin in financials" :key="fin.id" >
                <div class="py-3 w-100">
                    <div class="w-100 d-flex justify-content-between">
                      <div class="w-75 pe-2" style="border-right: 1px solid #eee">
                    <p class="mb-1 me-5  caption">Order Id : {{fin.order_id}}</p>
                    <p class="mb-1 caption">Particular : {{fin.particular}}</p>
                    <p class="mb-1  caption">Date : {{formatDate(fin.transaction_date)}}</p>
                    <p class="mb-1  caption">Amount : Rs {{fin.amount}}</p>
                    </div>
                       <div class="d-flex justify-content-center align-items-center">
                     <p class="mb-1  caption text-center">Payment Mode <br> {{fin.mode}}</p>
                     </div>
                     </div>
                </div>
                
                
            </ion-item>

        <h4 class="muted-title text-center mt-3 ion-padding" v-if="!loading && financials.length==0">You Have No Financials Records Yet</h4>
        
      
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
  IonList,
   IonRefresher,
  IonRefresherContent
   } from '@ionic/vue';

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
  IonList,
   IonRefresher,
  IonRefresherContent },
  data(){
    return{
      currentUser: {},
      financials: [],
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

           doRefresh(ev){
            ev.target.complete();
            this.getFinancials();
        },
  
     formatDate(value){
            if (!value) return ''
        value = moment(value).format("MMM Do YYYY");
        return value;
    
          },

          getFinancials(){
            this.loading = true;
             TasksApi.getFinancials().then(data=>{
               this.loading = false;
            this.financials = data.data.data;
            
        }).catch(error=>{
          this.loading = false;
            console.log(error);
        })
          }
  },
  async mounted(){
     let response = await this.localStorage.get('esaraUser');
    this.currentUser = response.profile;
    this.getFinancials();
  },

  created(){
     this.emitter.on("refreshApi", () => {
      this.getFinancials();
    });
  }
}
</script>


<style scoped>

</style>

