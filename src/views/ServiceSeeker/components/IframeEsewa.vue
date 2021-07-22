<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title @click="closeModal">Close</ion-title>
    
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <div class="h-100">

                <iframe class= 'webPage' name= "samplePage" :src="url" height="100%" width="100%">
    </iframe>
        </div>  
        
    </ion-content>
  </ion-page>
</template>

<script >
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem,IonLabel,IonInput } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import TasksApi from "./../../../api/tasks";

export default  {
  
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage ,IonItem,IonLabel,IonInput},
  props:{
      details:{

      }
  },
  data(){
      return{
          amount: "100",
          url: "",
          token: "12321321"
      }
  },

  methods:{
   
  },
  mounted(){
      this.url = `https://sijandyola.com.np/payment/index.html?token=${this.token}&amount=${this.details.amount}&${this.details.orderId}`
  }
}
</script>


<style scoped>

</style>