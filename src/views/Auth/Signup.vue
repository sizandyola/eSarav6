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
        <div v-if="step == 0">
          <h2 class="text-center ion-text-center mt-5">Are you a</h2>
          
          <div class="selection-wrapper mt-3">
            <div
              class="selection-box"
              @click="changeWorker(0)"
              :class="user.is_worker == 0 ? 'active' : ''"
            >
              <div><i class="fas fa-user"></i></div>

              Service Seeker
            </div>
            <div
              class="selection-box"
              @click="changeWorker(1)"
              :class="user.is_worker == 1 ? 'active' : ''"
            >
              <div>
                <i class="fas fa-tools"></i>
              </div>

              Worker
            </div>
          </div>
          <ion-button color="success" expand="full" class="mt-4" @click="stepOne"
            >Next</ion-button
          >
        </div>

        <div v-if="step == 1">
          <h2 class="text-center ion-text-center mt-5">Are you a</h2>
          <div class="selection-wrapper mt-3">
            <div
              class="selection-box"
              @click="user.is_company = 0"
              :class="user.is_company == 0 ? 'active' : ''"
            >
              <div><i class="fas fa-user"></i></div>

              Person
            </div>
            <div
              class="selection-box"
              @click="user.is_company = 1"
              :class="user.is_company == 1 ? 'active' : ''"
            >
              <div>
                <i class="fas fa-building"></i>
              </div>

              Company
            </div>
          </div>
          <ion-button color="success" expand="full" class="mt-4" @click="stepTwo"
            >Next</ion-button
          >
        </div>
        <div class="" v-if="step == 2">
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
           
           <ion-button color="success" expand="full" class="mt-4" @click="stepThree" :disabled="$v.value.user.phone.required.$invalid || $v.value.user.phone.minLength.$invalid"
            v-if="!sendingSms">Next</ion-button
          >

           <ion-button color="success" expand="full" class="mt-4" disabled v-if="sendingSms"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>
          
        </div>

        <div class="" v-if="step == 3">
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
          <p class="resend" @click="smsResend" v-if="!tokenResending">Didnt Receive Token? Resend </p>
          <ion-spinner name="crescent" v-if="tokenResending"></ion-spinner
        >
           <ion-button color="success" expand="full" class="mt-4" @click="stepFour" :disabled="$v.value.user.code.required.$invalid" v-if="!verifyingSms"
            >Next</ion-button
          >
              <ion-button color="success" expand="full" class="mt-4" disabled v-if="verifyingSms"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>

          
        </div>
     

        <div class="" v-if="step == 4">
          <h2 class="text-center ion-text-center mt-5">
            Complete Registration
          </h2>
          <form>
            
          <ion-item>
            <ion-label position="floating">Address</ion-label>
            <ion-input
              v-model="$v.value.user.address.$model"
              type="text"
             
            ></ion-input>
              
          </ion-item>
            <div class="input-error" v-if="$v.value.user.address.required.$invalid && $v.value.user.address.$dirty">Address is required</div>
            
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input
              v-model="$v.value.user.email.$model"
              type="email"
           
            ></ion-input>
          </ion-item>
           <div class="input-error" v-if="$v.value.user.email.required.$invalid && $v.value.user.email.$dirty">Email is required</div>
           <div class="input-error" v-if="$v.value.user.email.email.$invalid && $v.value.user.email.$dirty">Please Enter A Valid Email</div>
        
          <ion-item v-if="user.is_worker==0">
            <ion-label>Gender</ion-label>
            <ion-select interface="popover" v-model="user.gender">
              <ion-select-option value="male">Male</ion-select-option>
              <ion-select-option value="female">Female</ion-select-option>
            </ion-select>
          </ion-item>
          

          <ion-item v-if="user.is_worker==1">
            <ion-label>Primary Service</ion-label>
            <ion-select interface="popover" v-model="user.primary_service_id">
              <ion-select-option v-for="item in services" :value="item.id">{{
                item.title
              }}</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item v-if="user.is_worker==1">
            <ion-label position="floating">Pan Number</ion-label>
            <ion-input v-model="user.phone" type="tel"></ion-input>
          </ion-item>
          <ion-item v-if="user.is_worker==0">
            <ion-label position="floating">Date Of Birth</ion-label>
            <ion-input v-model="user.dob" type="date" min="1900-01" max="2003-05-01" ></ion-input>
          </ion-item>
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
          
            <ion-button color="success" expand="full" class="mt-4" @click="submitForm" :disabled="$v.value.$invalid" v-if="!creatingAccount"
            >Submit</ion-button
          >
              <ion-button color="success" expand="full" class="mt-4" disabled v-if="creatingAccount"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>
          </form>
          
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
      creatingAccount: false,
      tokenResending: false,
      services: [],

      user: {
        address: "",
        fullname: " ",
        email: "",
        phone: "",
        dob: "",
        is_company: 0,
        is_worker: 0,
        password: "",
        code: "",
        primary_service_id: null,

        profile_url: "",
        is_verified: false,
        is_certified: false,
      },
     
    };
  },
   validations() {
    return {
      user:{
        phone: {required, minLength: minLength(10)},
        code: {required},
        address:{required},
        email: {required,email},
        password: {required, minLength:minLength(8)}
      }
    }
  },
  methods: {
    changeWorker(val) {
      this.user.is_worker = val;
    },
  

    stepOne(){
      this.step = 1;
    },
    stepTwo(){
      this.step = 2;
    },
    stepThree(){
    
      this.sendCode();
    },
    stepFour(){
      this.verifyCode();
    },
    sendCode() {
      
      if (this.user.phone) {
        this.sendingSms = true;
        Auth
          .sendSms(this.user.phone)
          .then((data) => {
            
            this.sendingSms = false;
            if (data.data.status) {
              this.codeSent = true;
                this.step =3;
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
        .verifyToken({
          phone: this.user.phone,
        
          token: this.user.code,
        })
        .then((data) => {
          this.verifyingSms = false;
          
          if (data.data.data) {
            this.step = 4;
          } else {
               this.openToast("Something Went Wrong")
            
          }
        })
        .catch((error) => {
          this.verifyingSms = false;
          this.openToast(error.response.data);
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
      //  this.v$.$validate() // checks all inputs
      // if (!this.v$.$error) { // if ANY fail validation
      //   alert('Form successfully submitted.')
      // } else {
      //   alert('Form failed validation')
      // }
      this.creatingAccount = true;
      
      this.user.token = this.user.code;
      Auth
        .createAccount(this.user)
        .then((data) => {
          this.creatingAccount = false;
          if (data.data.status) {
            this.openToast("Account Created","success");
            this.$router.push({path:'/'});
          } else {
           
          }
        })
        .catch((error) => {
          this.creatingAccount = false;
          this.openToast(error.response.data)
          console.log("ERROR,", error.response.data);
         
        });
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