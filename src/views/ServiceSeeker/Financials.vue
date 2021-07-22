<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Financials</ion-title>
      </ion-toolbar>
    </ion-header>
    
     <ion-content :fullscreen="true">
      <div class="loading" v-if="loading">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
      <ion-list v-if="!loading">

            <ion-item v-for="fin in financials" :key="fin.id" >
                <div>
                    <div class="d-flex justify-content-between">
                         <p class="mb-1">Order Id : {{fin.id}}</p>
                    <p class="mb-1">Mode : {{fin.mode}}</p>
                    </div>
                    <p class="mb-1">Particular : {{fin.particular}}</p>
                    <p class="mb-1">Date : {{formatDate(fin.transaction_date)}}</p>
                    <p class="mb-1">Amount : Rs {{fin.amount}}</p>
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
  }
}
</script>


<style scoped>

</style>

