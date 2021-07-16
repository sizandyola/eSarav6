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
        <img :src="currentItem.image_url"/>
      </div>
      <div class="ion-padding">
        <h2 class="title-1">{{currentItem.title}}</h2>

        <p class="body" v-html="currentItem.description">
          
        </p>
       <ion-button color="primary" expand="full" class="mt-4" @click="proceed" 
            >Proceed</ion-button
          >
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';


export default  {
  name: 'Tab4',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  data(){
    return{
      currentItem : {}
    }
  },
  methods:{
    proceed(){
      this.$router.push("/service-details/"+this.currentItem.id)
    },
    goBack(){
      this.$router.go(-1);
    }
  },


  mounted(){
    this.currentItem = JSON.parse(this.$route.params.item);
    

  }
}
</script>

<style scoped>
.banner{
  width: 100%;
  height: 200px;
}

.banner img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>