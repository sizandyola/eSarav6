<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
         <ion-buttons slot="start">
          <ion-back-button @click="goBack"></ion-back-button>
        </ion-buttons>
        <ion-title>Documents</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="ion-padding">
        <div class="uploaded">
          <h1 class="title">Your Documents</h1>
          <div class="row">
            <div
              class="col-6 text-center mt-2"
              v-for="(docs, index) in documents"
              :key="index"
            >
              <div class="card">
                <div class="card-image">
                  <img
                    :src="
                      'https://storage.googleapis.com/esaragcm.appspot.com/uploads/' +
                      docs.document_url
                    "
                    class="img-fluid"
                  />
                </div>
                <div class="card-body">
                  {{ docs.title }}

                  <p class="caption">
                    Verified : {{ checkVal(docs.is_verified) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <ion-button @click="setOpen()">Upload Documents</ion-button>

          <ion-modal
    :is-open="modalOpen"
    css-class="my-custom-class"
    @didDismiss="setOpen(false)"
  >
    <Modal :data="data"></Modal>
  </ion-modal> -->

        <div class="card mt-3">
          <div class="card-body">
            <ion-item>
              <ion-label>Choose Document Type</ion-label>
              <ion-select interface="popover" v-model="selectedType">
                <ion-select-option
                  v-for="(item, index) in documentTypes"
                  :value="item"
                  :key="index"
                  >{{ item }}</ion-select-option
                >
              </ion-select>
            </ion-item>

            <ion-item>
              <!-- <ion-label>Choose File</ion-label> -->
              <ion-input type="file" @change="onFileChange($event)"></ion-input>
            </ion-item>

            <ion-button @click="upload()" expand="block" v-if="!submitting">Upload</ion-button>

              <ion-button color="primary" expand="full" class="mt-4" disabled v-if="submitting"
            >  <ion-spinner name="crescent" color="light"></ion-spinner></ion-button
          >
          </div>
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
  IonButton,
  IonModal,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  toastController
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import Modal from "./UploadModal.vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import TasksApi from "./../../api/tasks";
import localStorage from "./../../mixins/localStorage";

export default {
  name: "Tab3",
  mixins: [localStorage],
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonModal,
    Modal,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonInput,
    toastController
  },
  data() {
    return {
      submitting: false,
      documents: [],
      modalOpen: false,
      documentTypes: ["Citizenship", "CV", "Passport", "Education"],
      selectedType: "",
      currentUser : {},
      file: null
    };
  },

  methods: {
    checkVal(val) {
      if (val == 0) {
        return "Yes";
      } else {
        return "No";
      }
    },
    setOpen() {
      this.modalOpen = true;
    },
    onFileChange(ev){
        this.file = ev.target.files[0];
       
    },
    upload(){
      if(this.selectedType && this.file){
           let formData = new FormData();
        formData.append("image",this.file),
        formData.append("title",this.selectedType);
        formData.append("user_id", this.currentUser.id );
        this.submitting = true;
        TasksApi.uploadDocuments(formData).then(data=>{
            console.log(data.data);
              this.openToast("Upload Successful", 'success');
              this.submitting = false;
              this.selectedType = "";
              this.file = null;
        }).catch(error=>{
            console.log(error);
            this.openToast("Upload Failed", 'success');
            this.submitting = false;
        })
      }else{
        this.openToast("Please choose document type");
      }
      
    },

    loadDocuments() {
      TasksApi.getUserDocuments()
        .then((data) => {
          this.documents = data.data.data;
        
          this.loadDocuments();
        })
        .catch((error) => {
          
          console.log(error);
        });
    },
      goBack(){
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
  },

  async mounted() {
    this.loadDocuments();
    let response = await this.localStorage.get('esaraUser');
    this.currentUser = response.profile;
  },
};
</script>


<style>
ion-content {
  --ion-background-color: #f5f5f5;
}
td {
  background: #283890;
  padding: 5px;
  color: #fff;
}
</style>