<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tradesmen/tab1">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tradesmen/tab2">
          <ion-icon :icon="cubeOutline" />
          <ion-label>Tasks</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tradesmen/tab3">
          <ion-icon :icon="hammerOutline" />
          <ion-label>Trainings</ion-label>
        </ion-tab-button>

         <ion-tab-button tab="tab4" href="/tradesmen/tab4">
          <ion-icon :icon="calendarOutline" />
          <ion-label>Attendance</ion-label>
        </ion-tab-button>

           <ion-tab-button tab="tab5" href="/tradesmen/tab5">
          <ion-icon :icon="personOutline" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {  homeOutline, cubeOutline, hammerOutline, personOutline, calendarOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
   
      homeOutline,
      cubeOutline,
      hammerOutline,
      personOutline,calendarOutline
    }
  }
}
</script>

<style scoped>
ion-label{
  font-size: 11px !important;
}
</style>