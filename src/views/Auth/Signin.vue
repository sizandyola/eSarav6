<template>
  <ion-page>
      
    
    <ion-content :fullscreen="true">
      <div class="ion-padding" @click="goBack"><i class="fas fa-long-arrow-alt-left me-2"></i>Back</div>
      <div
        class="create-account d-flex flex-column justify-content-center h-100"
      >
        <div class="logo" style="margin-top: -50px">
          <img src="/assets/images/logo.png" />
        </div>

        <h2 class="title mt-2">Sign In as</h2>
        <ion-radio-group v-model="loginAs">
          <ion-list lines="none" class="d-flex justify-content-between">
            <ion-item :disabled="submitting">
              <ion-radio value="0" class="me-2"></ion-radio>
              <ion-label>Service Seeker</ion-label>
            </ion-item>

            <ion-item :disabled="submitting">
              <ion-radio value="1" class="me-2"></ion-radio>
              <ion-label>Tradesman</ion-label>
            </ion-item></ion-list
          >
        </ion-radio-group>

        <ion-item :disabled="submitting">
          <ion-label position="floating">Phone Number or Email</ion-label>
          <ion-input v-model="$v.value.user.username.$model" type="text"></ion-input>
        </ion-item>
        <div class="input-error" v-if="$v.value.user.username.required.$invalid && $v.value.user.username.$dirty">Phone number / email is required</div>

        <ion-item :disabled="submitting">
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="$v.value.user.password.$model" type="password"></ion-input>
        </ion-item>
        <div class="input-error" v-if="$v.value.user.password.required.$invalid && $v.value.user.password.$dirty">Password is required</div>

        <ion-button
          color="success"
          expand="full"
          class="mt-4"
          :disabled="$v.value.$invalid"
          @click="submitForm"
          v-if="!submitting"
          >Sign In</ion-button
        >

        <ion-button color="success" expand="full" class="mt-4" disabled v-if="submitting"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>

        <p class="forgot-password" @click="forgotPassword">Forgot Password? </p>
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
  IonRadio,
  IonRadioGroup,
  IonLabel,
  IonInput,
  IonButton,
  toastController,
} from "@ionic/vue";

import Auth from "./../../api/auth";
import TasksApi from "./../../api/tasks";
import localStorage from "./../../mixins/localStorage";
import useValidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators';
import { FCM } from "@capacitor-community/fcm";

export default {
  name: "Sign in",
  mixins: [localStorage],
  data() {
    return {
      fcm: FCM,
       v$: useValidate(),
      loginAs: "0",
      user: {
        username: "",
        email: "",
        password: "",
      },
      submitting: false,
    };
  },
   validations() {
    return {
      user:{
        username: {required},
        password: {required}
      }
    }
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonLabel,
    IonInput,
    IonButton,
    toastController,
  },

  methods: {
    async openToast(value, color) {
      const toast = await toastController.create({
        message: value,
        duration: 3000,
        position: "top",
        color: color ? color : "danger",
      });
      return toast.present();
    },
    async submitForm() {
      try {
        this.submitting = true;

        let tmpUser = {};

        if (this.user.username.indexOf("@") == -1) {
          tmpUser.phone = this.user.username;
        } else {
          tmpUser.email = this.user.username;
        }
        tmpUser.password = this.user.password;

        let login = await Auth.login(tmpUser);
        this.openToast("Login Successful", "success");
        this.submitting = false;
        // Seting Notification Token
            FCM.getToken()
        .then((r) => {
          this.saveToken(r.token);
        })
        .catch((err) => console.log(err));
        // ***
        await this.localStorage.set("esaraUser", login.data.data);

        if (this.loginAs == "0") {
          this.$router.push({ path: "/service-seeker" });
          await this.localStorage.set("loginAs", "0");
        } else {
          this.$router.push({ path: "/tradesmen" });
          await this.localStorage.set("loginAs", "1");
        }

        // login.data.data.loginAs = this.loginAs;
        //   this.$store.commit("setLoggedInUser", login.data.data);
      } catch (error) {
        this.submitting = false;
        console.log(error.response.data);
        this.openToast(error.response.data);
      }
    },
    setFCM(){

    },
    forgotPassword(){
      this.$router.push({path:"/forgot-password"});
    },
    goBack(){
      this.$router.replace({path:'/account-screen'});
    }
  },
  async mounted() {},

  created(){
    this.$v = useValidate();
    
  },
};
</script>

<style scoped>
.logo {
  text-align: center;
}
.logo img {
  width: 15vh;
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

.forgot-password {
  font-size: 14px;
  color: #70b4e4;
  margin-top: 15px;
  font-weight: 500;
}

ion-label{
  font-size: 14px !important;
}
</style>