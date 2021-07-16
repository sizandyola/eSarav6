<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Upload Documents</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
     <ion-item>
            <ion-label>Choose Document Type</ion-label>
            <ion-select interface="popover" v-model="selectedType">
              <ion-select-option v-for="(item,index) in documentTypes" :value="item" :key="index">{{
                item
              }}</ion-select-option>
            </ion-select>
          </ion-item>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel,IonItem,IonSelect,IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      content: 'Content',
      documentTypes: ["Citizenship","CV", "Passport","Education"],
      selectedType: "",
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar,IonLabel,IonItem,IonSelect,IonSelectOption}
});
</script>