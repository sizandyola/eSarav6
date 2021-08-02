<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title @click="closeModal">Close</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="ion-padding">
        <h4>Make Enquiry</h4>
         <ion-item>
          <ion-label position="floating">Fullname</ion-label>
          <ion-input v-model="details.fullname" disabled></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="details.email" disabled></ion-input>
        </ion-item>

         <ion-item>
          <ion-label position="floating">Phone</ion-label>
          <ion-input v-model="details.phone" disabled></ion-input>
        </ion-item>

         <ion-item>
          <ion-label position="floating">Subject</ion-label>
          <ion-input v-model="$v.value.details.subject.$model"></ion-input>
        </ion-item>
        <div class="input-error" v-if="$v.value.details.subject.required.$invalid && $v.value.details.subject.$dirty">Field is required</div>

         <ion-item>
          <ion-label position="floating">Message</ion-label>
          <ion-input v-model="$v.value.details.message.$model"></ion-input>
        </ion-item>

         <div class="input-error" v-if="$v.value.details.message.required.$invalid && $v.value.details.message.$dirty">Field is required</div>

        <ion-button class="mt-3" expand="block" @click="submit"  v-if="!submitting" :disabled="$v.value.$invalid">Submit</ion-button>

           <ion-button color="success" expand="full" class="mt-4" disabled v-if="submitting"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>

      </div>
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  toastController
} from "@ionic/vue";

import TasksApi from "./../../../api/tasks";
import localStorage from "./../../../mixins/localStorage";
import useValidate from '@vuelidate/core'
import { required  } from '@vuelidate/validators';

export default {
  components: {
    
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    toastController
  },
  
  mixins:[localStorage],
  data() {
    return {
        v$: useValidate(),
        currentUser: "",
        details:{

        },
        submitting:false
    };
  },

   validations() {
    return {
      details:{
         subject: {required},
          message: {required},
        
      }
    }
  },

  methods: {
       closeModal() {
      this.emitter.emit("dismissModal");
    },
      submit(){
                this.submitting = true;
                TasksApi.sendEnquiry(this.details).then(data=>{
                    this.openToast("Enquiry Sent","success");
                    this.details = {};
                    this.submitting = false;
                    this.closeModal();
                }).catch(error=>{
                    this.openToast("Something Went Wrong");
                    console.log(error);
                    this.submitting = false;
                })
      },

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
   
  },
   async mounted(){
        let response = await this.localStorage.get("esaraUser");
        
    this.currentUser = response.profile;
    this.details.fullname = this.currentUser.fullname;
    this.details.email = this.currentUser.email;
    this.details.phone = this.currentUser.phone;
    },
    created(){
        this.$v = useValidate();
    }
};
</script>


<style scoped>
</style>