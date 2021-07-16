<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
          <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Notifications</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
         <div class="loading" v-if="loading">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
      <ion-list v-if="!loading">
    <ion-item v-for="(notification,index) in notificationList" :key="index"  :class="notification.is_seen==0?'unseen':''"  @click="markRead(notification)">
     <ion-label>   <div class="py-2">{{notification.description}}</div>

        <div class="d-flex">
       <div class="mr-3">{{formatDate(notification.dateeng)}}  </div> 
       
       </div>

     </ion-label>
    </ion-item>
  
  </ion-list>

            <div class="d-flex justify-content-center mt-5" v-if="notificationList.length==0 && !loading">
            <p class="muted-title">You Have No Notifications</p>
            </div>
      
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonLabel,IonItem  } from '@ionic/vue';

import TasksApi from "./../../api/tasks";
import moment from "moment";


export default  {
  name: 'Notification',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton ,IonList, IonLabel,IonItem},
  data(){
    return{
     loading: false,
     notificationList : []
    }
  },
  methods:{
     goBack(){
      this.$router.go(-1);
    },

 formatDate(value){
            if (!value) return ''
        value = moment(value).format("MMM Do YYYY");
        return value;
    
          },
          markRead(notificationItem){
              this.loading = true;
                  TasksApi.editNotification(notificationItem.id).then(data=>{
              this.loadNotification()
          }).catch(error=>{
              console.log(error);
          })
          },

          loadNotification(){
               this.loading = true;
        
               TasksApi.getNotifications().then(data=>{
            this.notificationList = data.data.data;
            this.loading = false;
            
        }).catch(error=>{
            console.log(error)
            this.loading = true;
        })
          }


  },


  mounted(){
      this.loadNotification();
        
    

  }
}
</script>

<style scoped>
ion-item.unseen{
    --background:#CFEEFA;
}
ion-label{
        white-space: normal !important;
}
</style>