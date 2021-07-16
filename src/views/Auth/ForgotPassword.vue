<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header> -->
    <ion-content :fullscreen="true">
       <div class="ion-padding" @click="goBack"><i class="fas fa-long-arrow-alt-left me-2"></i>Back</div>
      <div
        class="create-account d-flex flex-column justify-content-center h-100"
      >
        <div class="logo" style="margin-top: -50px">
          <img src="/assets/images/logo.png" />
        </div>
      

      
        <div class="" v-if="step == 0">
          <ion-item>
            <ion-label position="floating">Phone Number</ion-label>
            <ion-input
              v-model="$v.value.user.phone.$model"
              type="tel"
              minlength="10"
              maxlength="10"
            ></ion-input>
          </ion-item>
           <div class="input-error" v-if="$v.value.user.phone.required.$invalid && $v.value.user.phone.$dirty">Phone Number is required</div>
          <div class="input-error" v-if="$v.value.user.phone.minLength.$invalid && $v.value.user.phone.$dirty">Enter Valid Phone Number</div>
           
           <ion-button color="success" expand="full" class="mt-4" @click="stepOne" :disabled="$v.value.user.phone.required.$invalid || $v.value.user.phone.minLength.$invalid"
            v-if="!sendingSms">Next</ion-button
          >

           <ion-button color="success" expand="full" class="mt-4" disabled v-if="sendingSms"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>
          
        </div>

        <div class="" v-if="step == 1">
          <ion-item>
            <ion-label position="floating">Phone Number</ion-label>
            <ion-input
              v-model="user.phone"
              type="tel"
              minlength="10"
              maxlength="10"
              disabled
            ></ion-input>
          </ion-item>
           
            <ion-item >
            <ion-label position="floating">Enter Sms Token</ion-label>
            <ion-input
              v-model="$v.value.user.code.$model"
              type="tel"
              minlength="6"
              maxlength="6"
            ></ion-input>
          </ion-item>
           <div class="input-error" v-if="$v.value.user.code.required.$invalid && $v.value.user.code.$dirty">Token is required</div>


             <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input
              v-model="$v.value.user.password.$model"
              type="password"
              minlength="6"
            ></ion-input>
          </ion-item>
          <div class="input-error" v-if="$v.value.user.password.required.$invalid && $v.value.user.password.$dirty">Field is required</div>
          <div class="input-error" v-if="$v.value.user.password.minLength.$invalid && $v.value.user.password.$dirty">Enter stronger password</div>

          
          <!-- <p class="resend" @click="smsResend" v-if="!tokenResending">Didnt Receive Token? Resend </p>
          <ion-spinner name="crescent" v-if="tokenResending"></ion-spinner
        > -->
           <ion-button color="success" expand="full" class="mt-4" @click="stepTwo" :disabled="$v.value.$invalid" v-if="!verifyingSms"
            >Next</ion-button
          >
              <ion-button color="success" expand="full" class="mt-4" disabled v-if="verifyingSms"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>

          
        </div>
     

        
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
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  toastController   
} from "@ionic/vue";
import TasksApi from "./../../api/tasks";
import Auth from "./../../api/auth";
import useValidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators';


export default {
  name: "Tab1",
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
    toastController


  },
  
  data() {
    return {
      
      v$: useValidate(),
      step: 0,
      codeSent: false,
      sendingSms: false,
      verifyingSms: false,
     
      tokenResending: false,
     

      user: {
      
        phone: "",
      
        password: "",
        code: "",
       
      },
     
    };
  },
   validations() {
    return {
      user:{
        phone: {required, minLength: minLength(10)},
        code: {required},
        password: {required, minLength:minLength(6)}
      }
    }
  },
  methods: {
    changeWorker(val) {
      this.user.is_worker = val;
    },

    stepOne(){
       this.sendCode();
    },
    stepTwo(){
      this.verifyCode();
    },
    stepThree(){
    
     
    },
    stepFour(){
      
    },
    sendCode() {
      
      if (this.user.phone) {
        this.sendingSms = true;
        Auth
          .forgotPasswordCode({phone:this.user.phone})
          .then((data) => {
            
            this.sendingSms = false;
            if (data.data.status) {
              this.codeSent = true;
                this.step =1;
            } else {
              this.openToast("Something Went Wrong")
            }
          })
          .catch((error) => {
            this.sendingSms = false;
            this.openToast(error.response.data);

            
            console.log(error.response.data);
          });
      } else {
      
      }
    },
     verifyCode() {
      this.verifyingSms = true;
      Auth
        .resetPassword({
          phone: this.user.phone,
          token: this.user.code,
          password: this.user.password,
           password_again: this.user.password,
        })
        .then((data) => {
          this.verifyingSms = false;
          
          if (data.data.data) {
            this.openToast("Password Reset Successful", 'success');
            this.$router.replace({path:'/sign-in'});
          } else {
               this.openToast("Something Went Wrong")
            
          }
        })
        .catch((error) => {
          this.verifyingSms = false;
          this.openToast(error.response.data + " Check Your Token");
          console.log(error);
          
        });
    },


    smsResend(){
       if (this.user.phone) {
        this.tokenResending = true;
        Auth
          .sendSms(this.user.phone)
          .then((data) => {
            this.openToast("Token is Resent", 'success');
            this.tokenResending = false;
            if (data.data.status) {
              this.codeSent = true;
                this.step =3;
            } else {
              this.openToast("Something Went Wrong")
            }
          })
          .catch((error) => {
            this.tokenResending = false;
            this.openToast(error.response.data);

            
            console.log(error.response.data);
          });
      } 
      
      
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

    

  submitForm(){

  },
     goBack(){
      this.$router.push({path:'/account-screen'});
    }

 
  },
  created(){
    this.$v = useValidate();
    
  },
  async mounted() {
    console.log("EACH LOAD?");
    TasksApi.getServices()
      .then((data) => {
        this.services = data.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.logo {
  text-align: center;
}
.logo img {
  width: 100px;
}
.create-account {
  padding: 0 30px;
}

.selection-wrapper {
  width: 100%;
  display: flex;
}

.selection-box {
  width: 150px;
  text-align: center;
  border: 1px solid #ccc;
  padding: 20px 0;
  margin: 0 5px;
}

.active {
  border-color: #70b4e4;
}

.resend{
  font-size: 14px;
  color: #70b4e4;
  margin-top: 15px;
  font-weight: 500;
}
</style>