<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Attendance</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="ion-padding">
          <h2 class="title-1 mb-3">Attendance Records</h2>

          <table class="table table-bordered">
              <tr>
                  <td>Date</td>
                  <td>Sign In</td>
                  <td>Sign out</td>
                  <td>Verified</td>
                  </tr>

            <tr v-for="(item,index) in attendance" :key="index">
                <td> {{formatDate(item.dateeng)}} </td>
                <td> {{item.sign_in}} </td>
                <td> {{item.sign_out}}  </td>
                <td> {{checkVal(item.is_verified)}} </td>

                </tr>

          </table>

    <div class="row">
        <div class="col-6">
                   <ion-button color="primary" expand="full" class="mt-4" @click="signIn"  v-if="!checkingIn" >Check In</ion-button >
                     <ion-button color="primary" expand="full" class="mt-4" disabled v-if="checkingIn"
            >  <ion-spinner name="crescent" color="light"></ion-spinner></ion-button
          >
        </div>
        <div class="col-6">
            <ion-button color="primary" expand="full" class="mt-4" @click="signOut"  v-if="!checkingOut">Check Out</ion-button >

             <ion-button color="primary" expand="full" class="mt-4" disabled v-if="checkingOut"
            >  <ion-spinner name="crescent" color="light"></ion-spinner></ion-button
          >
        </div>
    </div>
    


 

       

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, toastController } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import TasksApi from "./../../api/tasks";
import moment from "moment";

export default  {
  name: 'Tab3',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage,IonButton,toastController },

    data(){
        return{
            attendance: [],
            checkingIn: false,
            checkingOut: false,
        }
    },
  methods:{
       async openToast(value,color) {
      const toast = await toastController
        .create({
          message: value,
          duration: 3000,
          position: 'top',
          color: color?color:'danger'
        })
      return toast.present();
    },
      formatDate(value){
            if (!value) return ''
        value = moment(value).format("MMM Do YYYY");
        return value;
    
          },
      getAttendance(){
           TasksApi.getAttendance().then((data) => {
      this.attendance = data.data.data;
    }).catch(error=>{
        console.log(error)
    });
      },

      checkVal(val){
        if(val==0){
            return "Yes"
        }else{
            return "No"
        }
    },
    signIn() {
      this.checkingIn = true;
      TasksApi
        .checkIn()
        .then((data) => {
            this.openToast("Signed In",'success');
       this.getAttendance();
       this.checkingIn = false;
        })
        .catch((error) => {
            this.openToast(error.data?error.data:"Something Went Wrong");
          console.log(error);
          this.checkingIn = false;
      
        });
    },
    signOut() {
      this.checkingOut = true;
      TasksApi
        .checkOut()
        .then((data) => {
         this.checkingOut = false;
        this.openToast("Signed Out", 'success');
         this.getAttendance();
        })
        .catch((error) => {
          this.checkingOut = false;
            this.openToast(error.data?error.data:"Something Went Wrong");
              console.log(error);
          
        });
  },
  },

  mounted(){
      this.getAttendance();
  }
}
</script>


<style scoped>

</style>