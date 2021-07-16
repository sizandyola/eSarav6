<template>
    <ion-app>
    <ion-content fullscreen class="ion-padding" scroll-y="false">
      <ion-slides>

        <ion-slide>
          <div class="slide">
            <img src="/assets/images/slider1.png"/>
            <h2>Get Your Tasks Done</h2>
            <p>Post a task and get it done by professionals</p>
          </div>
        </ion-slide>

        <ion-slide>
          <img src="/assets/images/slider2.png"/>
          <h2>Looking For Work?</h2>
          <p>Connect with people and use your skills to solve their problems.</p>
        </ion-slide>

        <ion-slide>
          <img src="/assets/images/slider3.png"/>
          <h2>Get Your Job Here</h2>
          <p>Be a part of eSara Team</p>
        </ion-slide>

        <ion-slide>
          <img src="/assets/images/logo.png"/>
          <h2>इसारा कफी छ।</h2>
          <ion-button fill="clear" @click="test">Continue </ion-button>
        </ion-slide>

      </ion-slides>
    </ion-content>
  </ion-app>

</template>


<script >

import localStorage from "./../mixins/localStorage";
export default  {
  name: 'Tab1',
  mixins: [localStorage],
  methods:{
      test(){
          this.$router.push("/account-screen");
      }
  },
  async mounted(){
    await this.localStorage.set("introScreenShown",true);
    
  }
}
</script>


<style scoped>
 ion-slides {
      height: 100%;
    }

    .swiper-slide {
      display: block;
    }

    .swiper-slide h2 {
      margin-top: 2.8rem;
    }

    .swiper-slide img {
      max-height: 50%;
      max-width: 80%;
      margin: 60px 0 40px;
      pointer-events: none;
    }

    b {
      font-weight: 500;
    }

    p {
      padding: 0 40px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--ion-color-step-600, #60646b);
    }

    p b {
      color: var(--ion-text-color, #000000);
    }
</style>