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
                <img src="/assets/images/male.jpg" />
              </ion-avatar>
            </div>
            <div class="ms-3">
              <h4 class="title">{{ currentUser.fullname }}</h4>
              <p class="mb-1 caption">{{ currentUser.email }}</p>
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
            <ion-input v-model="currentUser.fullname" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Address</ion-label>
            <ion-input v-model="currentUser.address" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="currentUser.email" type="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Phone</ion-label>
            <ion-input v-model="currentUser.phone" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Date of Birth</ion-label>
            <ion-input v-model="currentUser.dob" type="date"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Qualifications</ion-label>
            <ion-input
              v-model="currentUser.qualification"
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Specialization</ion-label>
            <ion-input
              v-model="currentUser.specialization"
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Skills</ion-label>
            <ion-input v-model="currentUser.skills" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Trainings</ion-label>
            <ion-input v-model="currentUser.trainings" type="text"></ion-input>
          </ion-item>

          <ion-button
            color="primary"
            expand="full"
            class="mt-4"
            @click="submitForm"
            v-if="!submitting"
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
  toastController
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import localStorage from "./../../mixins/localStorage";
import TasksApi from "./../../api/tasks";

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
    toastController
  },
  mixins: [localStorage],

  data() {
    return {
      currentUser: {},
      submitting: false,
    };
  },
  methods: {
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
      }catch(error){
        this.openToast("Update Failed")
      }
      
    },
  },

  async mounted() {
    let response = await this.localStorage.get("esaraUser");
    this.currentUser = response.profile;
  },
   goBack(){
      this.$router.push({path:"/service-seeker/tab4"});
    },
};
</script>


<style>
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