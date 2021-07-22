<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title @click="closeModal">Close</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="ion-padding">
        <h4>Make Payment</h4>
        <ion-item>
          <ion-label position="floating">Order</ion-label>
          <ion-input disabled :value="details.title"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Amount</ion-label>
          <ion-input v-model="amount" type="number"></ion-input>
        </ion-item>

        <h4 class="my-3 title">Pay With</h4>

        <div class="row">
          <div class="col-6">
            <img
              src="/assets/images/khalti_logo.png"
              class="img-fluid"
              @click="makeSingleKhaltiPayment"
            />
          </div>
          <div class="col-6">
            <img src="/assets/images/esewa_logo.png" class="img-fluid" @click="esewaModal"/>
            <!-- <button @click="esewaModal">Test</button> -->
            
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
  IonItem,
  IonLabel,
  IonInput,
  modalController,
  toastController
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import TasksApi from "./../../../api/tasks";
import EsewaComponent from "./../../ServiceSeeker/components/EsewaComponent.vue";
import IframeEsewa from "./../../ServiceSeeker/components/IframeEsewa";
import { Browser } from '@capacitor/browser';
import localStorage from "./../../../mixins/localStorage";

export default {
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    EsewaComponent,
    toastController
  },
  props: {
    details: {},
  },
  mixins:[localStorage],
  data() {
    return {
      amount: "10",
      token :""
    };
  },

  methods: {
    closeModal() {
      this.emitter.emit("dismissModal");
    },
    async esewaModal() {
        await Browser.open({ url: `https://beta.esara.com.np/mobile-payment/index.html?token=${this.token}&amount=${this.amount}&orderId=${this.details.orderId}` });
   
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
    makeSingleKhaltiPayment() {
      let vm = this;
      let config = {
        // replace the publicKey with yours
        publicKey: "test_public_key_1f371adc3d054f69af6156547fd93025",
        productIdentity: "26",

        productName: "testorder",
        productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
        paymentPreference: ["KHALTI"],
        eventHandler: {
          onSuccess(payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            vm.openToast("Khalti Payment Successful",'success');
            vm.verifyPayment(payload);
          },
          onError(error) {
            console.log(error);
          },
          onClose() {
            console.log("widget is closing");
          },
        },
      };
      let checkout = new KhaltiCheckout(config);

      // minimum transaction amount must be 10, i.e 1000 in paisa.
      checkout.show({ amount: 10 * 100 });
    },

    verifyPayment(payload) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const urlparams = Object.fromEntries(urlSearchParams.entries());
      let tempData = {
        order_id: this.details.orderId,
        transaction_date: new Date(),
        mode: "KHALTI",
        particular: this.details.remarks,
        payment_type: "Receivables",
        amount: this.amount * 100,
        entered_by: 0,
        token: payload.token,
      };

      this.emitter.emit("dismissModal");

      TasksApi.verifyKhaltiPayment(tempData)
        .then((data) => {
          this.getFinancialData();
          this.paymentData = {};
        })
        .catch((error) => {
          console.log(error);
        });
    },
   
  },
   async mounted(){
        let response = await this.localStorage.get("esaraUser");
        this.token = response.token.token;
    // this.currentUser = response.profile;
    }
};
</script>


<style scoped>
</style>