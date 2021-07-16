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
        <h2>{{currentItem.title}}</h2>

        <p v-html="currentItem.description">
          
        </p>

        <ion-item>
            <ion-label>Training Shifts</ion-label>
            <ion-select interface="popover" v-model="training_shift">
              <ion-select-option v-for="item in toArray(currentItem.training_shifts)" :value="item">{{
                item
              }}</ion-select-option>
            </ion-select>
          </ion-item>
            <ion-item>
            <ion-label>Training Dates</ion-label>
            <ion-select interface="popover" v-model="training_date">
              <ion-select-option v-for="item in toArray(currentItem.training_dates)" :value="item">{{
                item
              }}</ion-select-option>
            </ion-select>
          </ion-item>

           <ion-item>
            <ion-label position="floating">Remarks</ion-label>
            <ion-input v-model="remarks" type="text"></ion-input>
          </ion-item>
      
       <ion-button color="success" expand="full" class="mt-4" @click="book" 
            >Book Training</ion-button
          >
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,   IonSelect,
    IonSelectOption, } from '@ionic/vue';

    import TasksApi from "./../../api/tasks";
    import localStorage from "./../../mixins/localStorage";


export default  {
  name: 'Tab4',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton,   IonSelect,
    IonSelectOption, },
  data(){
    return{
      currentItem : {},
       
            training_shift:"",
            training_date:"",
            remarks:"",
    }
  },
  mixins:[localStorage],
  methods:{
    proceed(){
      this.$router.push("/service-details/"+this.currentItem.id)
    },
    goBack(){
      this.$router.go(-1);
    },

      toArray(val){
            if(val){
                return val.split(",");
            }else{
                return ""
            }
            
        },
        toArrayAndFormatDate(val){
              if(val){
                 let tempArr = val.split(",");
            return tempArr.map(x => this.formatDate(x))
            }else{
                return ""
            }

           

        },
        book(){
               
                 let bookingDetails = {
               user_id: this.currentUser.id,
               training_id:this.currentItem.id,
               training_start_date:this.training_date,
               preffered_time_shift:this.training_shift,
               remarks:this.remarks
                 }
           
           
           this.submitting  = true;
           TasksApi.bookTraining(bookingDetails).then(data=>{
              
               this.submitting  = false;
           }).catch(error=>{
               console.log(error);
               this.submitting  = false;
           })
           }
        },
  


  async mounted(){
    this.currentItem = JSON.parse(this.$route.params.item);
    let response = await this.localStorage.get('esaraUser');
    this.currentUser = response.profile;
    // console.log(JSON.stringify(this.currentItem));
    

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