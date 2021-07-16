<template>
  <ion-page>
    <ion-content :fullscreen="true">
   
    <div class="account-screen">
        <div class="wrapper">
            <div class="logo">
                <img src="/assets/images/logo.png"/>
                <h2 class="subtitle">App that connects service seekers and providers</h2>
            </div>
            <div class="actions">
                <ion-button color="success" expand="full" @click="goTo('/sign-up')" >Create Account</ion-button>
                <ion-button fill="outline" color="light" expand="full" @click="goTo('/sign-in')">Sign In</ion-button>
            </div>
        </div>
    </div>
        
    </ion-content>
  </ion-page>
  
  
</template>

<script >
import { IonContent,IonButton, IonPage  } from '@ionic/vue';


export default  {
  name: 'Tab3',
  components: {  IonContent,IonButton, IonPage  },
  methods:{
      goTo(val){
          this.$router.push({path:val})
      }
  }
}
</script>

<style scoped>


.account-screen .wrapper{
    height: 100%;
    width: 100%;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    
}
.logo{
    text-align: center;
}

.logo img{
    width: 100px;
    
}
.account-screen{
    background-image: url("/assets/images/sign-up-bg.jpg");
    height: 100%;
    background-repeat: none;
    background-size: cover;
}

h1{
    margin-top:0;
}

.subtitle{
    color: #fff;
    text-align: center;
    padding: 0 15px;
    font-weight: 400;
    font-size: 20px
    
}

.actions{
    padding: 0 15px;
}

.actions ion-button{
    height: 50px;
    margin-top: 15px;
}
</style>