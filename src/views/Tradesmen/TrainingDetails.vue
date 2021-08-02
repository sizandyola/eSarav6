<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Details</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="banner">
        <img :src="currentItem.image_url" />
      </div>
      <div class="ion-padding">
        <h2>{{ currentItem.title }}</h2>

        <p v-html="currentItem.description"></p>

        <ion-item>
          <ion-label>Training Shifts</ion-label>
          <ion-select interface="popover" v-model="$v.value.training_shift.$model">
            <ion-select-option
              v-for="item in toArray(currentItem.training_shifts)"
              :value="item"
              >{{ item }}</ion-select-option
            >
          </ion-select>
        </ion-item>
          <div class="input-error" v-if="$v.value.training_shift.required.$invalid && $v.value.training_shift.$dirty">Training Shift is required</div>
        <ion-item>
          <ion-label>Training Dates</ion-label>
          <ion-select interface="popover" v-model="$v.value.training_date.$model">
            <ion-select-option
              v-for="item in toArray(currentItem.training_dates)"
              :value="item"
              >{{ item }}</ion-select-option
            >
          </ion-select>
        </ion-item>
        <div class="input-error" v-if="$v.value.training_date.required.$invalid && $v.value.training_date.$dirty">Training Date is required</div>

        <ion-item>
          <ion-label position="floating">Remarks</ion-label>
          <ion-input v-model="$v.value.remarks.$model" type="text"></ion-input>
        </ion-item>
        <div class="input-error" v-if="$v.value.remarks.required.$invalid && $v.value.remarks.$dirty">Remarks is required</div>

        <ion-button color="success" expand="full" class="mt-4" @click="book" :disabled="$v.value.$invalid" v-if="!submitting"
          >Book Training</ion-button
        >

          <ion-button color="success" expand="full" class="mt-4" disabled v-if="submitting"
          ><ion-spinner name="crescent"></ion-spinner
        ></ion-button>
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
  IonButton,
  IonSelect,
  IonSelectOption,
  toastController,
  IonInput
} from "@ionic/vue";

import TasksApi from "./../../api/tasks";
import localStorage from "./../../mixins/localStorage";

import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';

export default {
  name: "Tab4",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonSelect,
    IonSelectOption,
    toastController,
    IonInput
  },
  data() {
    return {
      v$: useValidate(),
      currentItem: {},

      training_shift: "",
      training_date: "",
      remarks: "",
      submitting: false,
    };
  },
    validations() {
    return {
         training_shift: {required},
        training_date: {required},
        remarks: {required},
    }
  },
  mixins: [localStorage],
  methods: {
    proceed() {
      this.$router.push("/service-details/" + this.currentItem.id);
    },
    goBack() {
      this.$router.go(-1);
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

    toArray(val) {
      if (val) {
        return val.split(",");
      } else {
        return "";
      }
    },
    toArrayAndFormatDate(val) {
      if (val) {
        let tempArr = val.split(",");
        return tempArr.map((x) => this.formatDate(x));
      } else {
        return "";
      }
    },
    book() {
          let bookingDetails = {
        user_id: this.currentUser.id,
        training_id: this.currentItem.id,
        training_start_date: this.training_date,
        preffered_time_shift: this.training_shift,
        remarks: this.remarks,
      };

      this.submitting = true;
      TasksApi.bookTraining(bookingDetails)
        .then((data) => {
          this.submitting = false;
          this.openToast("Training Booking Successful","success");
          this.training_shift = "";
          this.training_date = "";
          this.remarks = "";
          this.v$.$reset();
          this.$router.replace("/tradesmen/tab1");
        })
        .catch((error) => {
          console.log(error);
          this.submitting = false;
        });
      

    
    },
  },

  async mounted() {
    this.currentItem = JSON.parse(this.$route.params.item);
    let response = await this.localStorage.get("esaraUser");
    this.currentUser = response.profile;
    // console.log(JSON.stringify(this.currentItem));
  },
   created(){
    this.$v = useValidate();
    
  },
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 200px;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>