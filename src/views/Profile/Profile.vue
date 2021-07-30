<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <div class="header">
         <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
      </div>
      <div class="card profile-card">
        <div calss="card-body">
          <div class="d-flex">
            <div class="">
              <ion-avatar>
                <img :src="'https://storage.googleapis.com/esaragcm.appspot.com/uploads/'+currentUser.profile_url" v-if="currentUser.profile_url"/>
                <img src="/assets/images/male.jpg" v-else/>
                
              </ion-avatar>
            </div>
            <div class="ms-3">
              <h4 class="title">{{ currentUser.fullname }}</h4>
              <p class="mb-1 caption">{{ currentUser.email }}</p>

                   <input type="file" @change="onFileChange($event)" hidden ref="inputFile">
               <button class="mb-1 caption" @click="changePicture" style="cursor:pointer" v-if="!changing" >Change Profile Picture </button>
                  <ion-spinner name="crescent" color="dark" v-if="changing"></ion-spinner>
            </div>
          </div>
        </div>
      </div>
    </ion-header>
    <ion-content :fullscreen="true" class="">
      <div class="card mt-3">
        <div class="card-body">
          <ion-item>
            <ion-label position="floating">Full Name</ion-label>
            <ion-input v-model="$v.value.currentUser.fullname.$model" type="text"></ion-input>
          </ion-item>
          <div class="input-error" v-if="$v.value.currentUser.fullname.required.$invalid && $v.value.currentUser.fullname.$dirty">Fullname is required</div>
          <ion-item>
            <ion-label position="floating">Address</ion-label>
            <ion-input v-model="$v.value.currentUser.address.$model" type="text"></ion-input>
          </ion-item>
            <div class="input-error" v-if="$v.value.currentUser.address.required.$invalid && $v.value.currentUser.address.$dirty">Address is required</div>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="$v.value.currentUser.email.$model" type="email"></ion-input>
          </ion-item>
            <div class="input-error" v-if="$v.value.currentUser.email.required.$invalid && $v.value.currentUser.email.$dirty">Email is required</div>
           <div class="input-error" v-if="$v.value.currentUser.email.email.$invalid && $v.value.currentUser.email.$dirty">Please Enter A Valid Email</div>
          <ion-item>
            <ion-label position="floating">Phone</ion-label>
            <ion-input v-model="$v.value.currentUser.phone.$model" type="text"></ion-input>
          </ion-item>
          <div class="input-error" v-if="$v.value.currentUser.phone.required.$invalid && $v.value.currentUser.phone.$dirty">Phone is required</div>
          <ion-item>
            <ion-label position="floating">Date of Birth</ion-label>
            <ion-input v-model="currentUser.dob" type="date" min="1900-01" max="2003-05-01" ></ion-input>
          </ion-item>

            <ion-item >
            <ion-label>Gender</ion-label>
            <ion-select interface="popover" v-model="currentUser.gender">
              <ion-select-option value="M">Male</ion-select-option>
              <ion-select-option value="F">Female</ion-select-option>
            </ion-select>
          </ion-item>

            <ion-item>
            <ion-label position="floating">Pan Number</ion-label>
            <ion-input v-model="currentUser.panno" type="number"></ion-input>
          </ion-item>

             <ion-item>
            <ion-label position="floating">Bio</ion-label>
            <ion-input v-model="currentUser.remarks" type="text"></ion-input>
          </ion-item>

      
          <div class="input-error mt-3" v-if="$v.value.$invalid">Please fill all required fields</div>
          <ion-button
            color="primary"
            expand="full"
            class="mt-4"
            @click="submitForm"
            v-if="!submitting"
            :disabled="$v.value.$invalid"
            >Save</ion-button
          >
             <ion-button color="primary" expand="full" class="mt-4" disabled v-if="submitting"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton,
  toastController,
  IonSelect
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import localStorage from "./../../mixins/localStorage";
import TasksApi from "./../../api/tasks";
import moment from "moment";

import useValidate from '@vuelidate/core'
import { required, email, minLength,sameAs  } from '@vuelidate/validators';

export default {
  name: "Tab4",
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonAvatar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
    toastController,
    IonSelect
  },
  mixins: [localStorage],

  data() {
    return {
         v$: useValidate(),
      currentUser: {
        
      },
      submitting: false,
      changing: false,
      file: null,
    };
  },
    validations() {
    return {
      currentUser:{
         fullname: {required},
        phone: {required, minLength: minLength(10)},
  
        address:{required},
        email: {required,email},
        
      }
    }
  },
  methods: {
     changePicture(){
       console.log("Clicked");
      console.log("REFS",JSON.stringify(this.$refs.inputFile.click()));
    },
    onFileChange(ev){
        this.file = ev.target.files[0];
         if (this.file.size > 5242880) {
        // Limit is 5 mb
        this.openToast(
          "File Too Large. Please upload documents with fileszie < 5mb"
        );
      } else {
        if (this.file) {
          this.changing = true;
          let formData = new FormData();
          formData.append("image", this.file),

          TasksApi.uploadImage(formData)
            .then((data) => {
              this.openToast("Upload Successful", "success");
              this.file = null;
              this.currentUser.profile_url = data.data.data;
              this.submitForm();
              this.changing = false;
            })
            .catch((error) => {
              console.log(error);
              this.openToast("Upload Failed", "error");
              this.changing = false;
              
            });
        } else {
          this.openToast("Please choose document type");
        }
      }
    },
        formatDate(value){
            if (!value) return ''
        value = moment(value).format("YYYY-MM-DD");
        return value;
    
          },
    submitForm() {
      this.submitting = true;

      TasksApi.editProfile(this.currentUser)
        .then((data) => {
          // this.$store.commit('setLoggedInUser',data.data.data);

          this.updateProfile(data.data.data);
          this.submitting = false;
        })
        .catch((error) => {
          this.submitting = false;
          console.log(error);
        });
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
    async updateProfile(newProfile) {
      try{
        let response = await this.localStorage.get("esaraUser");
      response.profile = newProfile;
      let editProfile = await this.localStorage.set("esaraUser", response);
      this.openToast("Profile Updated", "success");
       this.emitter.emit("refreshProfile");
      }catch(error){
        this.openToast("Update Failed")
      }
      
    },

   
  }, 
   created(){
    this.$v = useValidate();
    
  },

  async mounted() {
    let response = await this.localStorage.get("esaraUser");
    this.currentUser = response.profile;
    this.currentUser.dob = this.formatDate(this.currentUser.dob);
  },
   goBack(){
      this.$router.push({path:"/service-seeker/tab4"});
    },
};
</script>


<style scoped>
ion-content {
  --ion-background-color: #f5f5f5;
}

.header {
  background: #00adee;
  min-height: 100px;
}

.profile-card {
  margin-top: -40px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 15px;
}

.item-icon i {
  color: #00adee;
}

.item-title {
  font-size: 12px;
  font-family: "Poppins", sans-serif;
}

p {
}

ion-back-button{
  --ion-color: #fff
}
</style>