<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
          <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Book Service</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

        
           
          <form class="ion-padding">
            <h4 class="subtitle">Fill the following details</h4>

               <ion-item>
            <ion-label position="floating">Title</ion-label>
            <ion-input
              v-model="$v.value.bookDetails.title.$model"
              type="text"
             
            ></ion-input>
              
          </ion-item>
            <div class="input-error" v-if="$v.value.bookDetails.title.required.$invalid && $v.value.bookDetails.title.$dirty">Title is required</div>

               <ion-item>
            <ion-label position="floating">Fullname</ion-label>
            <ion-input
              v-model="$v.value.bookDetails.fullname.$model"
              type="text"
             
            ></ion-input>
              
          </ion-item>
            <div class="input-error" v-if="$v.value.bookDetails.fullname.required.$invalid && $v.value.bookDetails.fullname.$dirty">Fullname is required</div>
    
       
      
        
          <ion-item>
            <ion-label position="floating">Phone Number</ion-label>
            <ion-input
              v-model="$v.value.bookDetails.phone.$model"
              type="tel"
              minlength="10"
              maxlength="10"
            ></ion-input>
          </ion-item>
           <div class="input-error" v-if="$v.value.bookDetails.phone.required.$invalid && $v.value.bookDetails.phone.$dirty">Phone Number is required</div>
          <div class="input-error" v-if="$v.value.bookDetails.phone.minLength.$invalid && $v.value.bookDetails.phone.$dirty">Enter Valid Phone Number</div>
            
          <ion-item>
            <ion-label position="floating">Address</ion-label>
            <ion-input
              v-model="$v.value.bookDetails.address.$model"
              type="text"
             
            ></ion-input>
              
          </ion-item>
            <div class="input-error" v-if="$v.value.bookDetails.address.required.$invalid && $v.value.bookDetails.address.$dirty">Address is required</div>
            
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input
              v-model="$v.value.bookDetails.email.$model"
              type="email"
           
            ></ion-input>
          </ion-item>
           <div class="input-error" v-if="$v.value.bookDetails.email.required.$invalid && $v.value.bookDetails.email.$dirty">Email is required</div>
           <div class="input-error" v-if="$v.value.bookDetails.email.email.$invalid && $v.value.bookDetails.email.$dirty">Please Enter A Valid Email</div>
        
        

          <!-- <ion-item>
            <ion-label>Primary Service</ion-label>
            <ion-select interface="popover" v-model="user.primary_service_id">
              <ion-select-option v-for="item in services" :value="item.id">{{
                item.title
              }}</ion-select-option>
            </ion-select>
          </ion-item> -->

        
          <ion-item>
            <ion-label position="floating">Service Date</ion-label>
            <ion-input v-model="$v.value.bookDetails.service_date.$model" type="date" :min="todayDate"></ion-input>

              
          </ion-item>

            <ion-item>
    <ion-textarea placeholder="Enter more information here..."  v-model="$v.value.bookDetails.remarks.$model"></ion-textarea>
  </ion-item>
   <div class="input-error" v-if="$v.value.bookDetails.remarks.required.$invalid && $v.value.bookDetails.remarks.$dirty">Remarks is required</div>
      
          
            <ion-button color="primary" expand="full" class="mt-4" @click="submitForm" :disabled="$v.value.$invalid" v-if="!submitting"
            >Submit</ion-button
          >

            <ion-button color="primary" expand="full" class="mt-4" disabled v-if="submitting"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>
         
          </form>
          
  
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
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  toastController,
  IonTextarea   
} from "@ionic/vue";
import TasksApi from "./../../api/tasks";
import Auth from "./../../api/auth";
import useValidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators';
import moment from "moment";
import localStorage from "./../../mixins/localStorage";


export default {
  name: "Tab1",
  mixins: [localStorage],
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonIcon,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonSpinner ,
    toastController,
    IonTextarea


  },
  
  data() {
    return {
      
      v$: useValidate(),
      submitting: false,
      bookDetails:{
                user_id : "",
                service_id : "",
                service_date : "",
                fullname : "",
                address : "",
                email : "",
                phone : "",
                remarks : "",
                progress : ""
      }
  
     
    };
  },
   validations() {
    return {
        todayDate: "",
        currentUser:{},
        submitting: false,
      bookDetails:{
          title: {required},
          fullname: {required},
          service_date:{required},
          fullname: {required},
          address: {required},
          email: {required,email},
          phone: {required,minLength},
          remarks: {required},
          service_date:{required}
          
      }
    }
  },
  methods: {
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
   submitForm(){
       this.submitting = true;
        TasksApi.bookService(this.bookDetails).then(data=>{
                this.$router.push("/service-seeker");
                this.openToast("Your Order has been placed","success");
                this.submitting = false;
            }).catch(error=>{
              this.submitting = false;
              this.openToast(error);
            })
   },
      goBack(){
      this.$router.go(-1);
    }


   

 
  },
  created(){
    this.$v = useValidate();
    

  
  },
  async mounted() {
    this.todayDate = moment().format("YYYY-MM-DD");
    let response = await this.localStorage.get('esaraUser');
    this.currentUser = response.profile;
    this.bookDetails.user_id = this.currentUser.id;
    this.bookDetails.service_id = this.$route.params.id;
    this.bookDetails.fullname = this.currentUser.fullname;
    this.bookDetails.phone = this.currentUser.phone;
    this.bookDetails.address = this.currentUser.address;
    this.bookDetails.email = this.currentUser.email;
    
  },
};
</script>

<style scoped>

</style>