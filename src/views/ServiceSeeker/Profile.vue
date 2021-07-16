<template>
  <ion-page>
    <ion-header class="ion-no-border">
        <div class="header">

        </div>
        <div class="card profile-card">
          <div calss="card-body">
            <div class="d-flex">
              <div class="">
                   <ion-avatar>
    <img src="/assets/images/male.jpg">
  </ion-avatar>
              </div>
              <div class="ms-3">
                <h4 class="title">{{currentUser.fullname}}</h4>
               <p class="mb-0 caption">{{currentUser.email}}</p>
               <!-- <p class="caption">Logged in as service seeker</p> -->
              </div>
              </div>
            </div>
        </div>
    </ion-header>
    <ion-content :fullscreen="true" class="">
      
      <ion-grid>
    <ion-row>
      <ion-col size="4" @click="goTo('/profile')">
        <div class="card p-3">
          <div class="item-icon  text-center">
              <i class="fas fa-user"></i>
          </div>
          <div class="item-title  text-center">
            Profile
          </div>
        </div>
      </ion-col>
       <ion-col size="4" @click="goTo('/documents')">
         <div class="card  p-3">
          <div class="item-icon text-center">
              <i class="fas fa-file-alt"></i>
          </div>
          <div class="item-title  text-center">
            Documents
          </div>
        </div>
      </ion-col>
       <ion-col size="4" @click="goTo('/notifications')">
         <div class="card  px-2 py-3">
          <div class="item-icon  text-center">
              <i class="fas fa-bell"></i>
          </div>
          <div class="item-title  text-center">
            Notifications
          </div>
        </div>
      </ion-col>
       <ion-col size="4" @click="logout">
         <div class="card  p-3">
          <div class="item-icon  text-center">
              <i class="fas fa-sign-out-alt"></i>
          </div>
          <div class="item-title  text-center">
            Logout
          </div>
        </div>
      </ion-col>
    
    </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import localStorage from "./../../mixins/localStorage";

export default  {
  name: 'Tab4',
  mixins: [localStorage],
  data(){
    return{
      currentUser: {}
    }
  },
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  mixins: [localStorage],
  methods:{
    goTo(val){
      this.$router.push({path:val})
    },
    logout(){
      this.$router.replace({path:"/sign-in"}).then(data=>{
        this.localStorage.clear();
      })
    }
  },
  async mounted(){
    let response = await this.localStorage.get("esaraUser");
    this.currentUser = response.profile;
  }
}
</script>


<style scoped>
ion-content{

    --ion-background-color:#f5f5f5;
}

.header{
  background: #00adee;
  min-height: 100px;
}

.profile-card{
  margin-top: -40px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 15px;
}

.item-icon i {
  color: #00adee;
}

.item-title{
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
}

.item-title-1{
  font-size: 10px;
  font-family: 'Poppins', sans-serif;
}

p{}
</style>