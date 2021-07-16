<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/service-seeker/tab1">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/service-seeker/tab2">
          <ion-icon :icon="cubeOutline" />
          <ion-label>My Orders</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/service-seeker/tab3">
          <ion-icon :icon="hammerOutline" />
          <ion-label>Training</ion-label>
        </ion-tab-button>

           <ion-tab-button tab="tab4" href="/service-seeker/tab4">
          <ion-icon :icon="personOutline" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {  homeOutline, cubeOutline, hammerOutline, personOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
   
      homeOutline,
      cubeOutline,
      hammerOutline,
      personOutline
    }
  }
}
</script>


<style scoped>
ion-label{
  font-size: 11px;
}
</style>