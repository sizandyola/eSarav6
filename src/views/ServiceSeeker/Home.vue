<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          <img src="/assets/images/logo.png" style="width: 50px" /> eSara
        </ion-title>

        <ion-buttons slot="end">
          <i
            class="fas fa-bell pe-3"
            style="font-size: 21px"
            @click="notifications"
          ></i>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Carousel />
      <div>
        <h2 class="ion-padding">Services</h2>
        <div class="loading" v-if="loading">
          <ion-spinner name="crescent" color="primary"></ion-spinner>
        </div>
        <ion-grid>
          <ion-row>
            <ion-col
              size="6"
              size-sm
              v-for="(item, index) in services"
              :key="index"
              @click="goTo(item)"
            >
              <ion-card>
                <div class="image-wrapper">
                  <img :src="item.image_url" />
                </div>
                <ion-card-header>
                  <ion-card-subtitle style="-webkit-box-orient: vertical">
                    <p
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        line-height: 16px;
                        -webkit-box-orient: vertical;
                      "
                    >
                      {{ item.title }}
                    </p>
                  </ion-card-subtitle>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div style="background:#00adee;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;" class="py-3">
          <p class="subtitle text-white">Do You have any queryies? </p>
          <ion-button color="light" expand="block" @click="enquiryModal">Enquiry</ion-button>
          
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
  modalController,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import Carousel from "./components/Carousel.vue";
import TasksApi from "./../../api/tasks";
import localStorage from "./../../mixins/localStorage";
import EnquiryModalComponent from "./components/EnquiryModalComponent.vue";

export default {
  name: "Tab1",
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    Carousel,
  },
  data() {
    return {
      loading: true,
      services: [],
      modal:""
    };
  },
  mixins: [localStorage],

  methods: {
    getServices() {
      TasksApi.getServices()
        .then((data) => {
          this.services = data.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log("ERROR", error);
          this.loading = false;
        });
    },
    goTo(item) {
      this.$router.push({
        name: "serviceDetails",
        params: { item: JSON.stringify(item) },
      });
    },
    notifications() {
      this.$router.push("/notifications");
    },
    async enquiryModal(){
      this.modal = await modalController.create({
        component: EnquiryModalComponent,
        cssClass: "my-custom-class",
        componentProps: {
        
        },
      });
      return this.modal.present();
    }
  },

  async mounted() {
    this.getServices();

    try {
      let profile = await TasksApi.getProfile();
      let response = await this.localStorage.get("esaraUser");
      response.profile = profile.data.data;
      await this.localStorage.set("esaraUser", response);
    } catch (error) {
      console.log(error);
    }
  },

  created(){
     this.emitter.on("dismissModal", () => {
      this.modal.dismiss().then(() => {
        this.modal = null;
      });
    });
  }
};
</script>


<style scoped>
.image-wrapper {
  height: 100px;
  width: 100%;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

ion-card-header {
  height: 80px;

  /* white-space: wrap !important;
  width: 150px !important; */
  /* overflow: hidden !important;
  text-overflow: ellipsis !important;
  color: var(--ion-color-default-shade) !important; */
}
</style>