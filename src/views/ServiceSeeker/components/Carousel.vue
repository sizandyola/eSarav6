<template>
    
    
      <ion-slides>

        <ion-slide>
          <div class="slide">
            <img src="/assets/images/promo2.png"/>
          
          </div>
        </ion-slide>

    

      </ion-slides>
    
  

</template>


<script >


export default  {
  name: 'Tab1',
  methods:{
      test(){
          this.$router.push("/account-screen");
      }
  }
}
</script>


<style scoped>
 ion-slides {
      height: 200px;
      overflow: hidden;
    }

    img{
        height: 100%;
        width: 100%;
    
        object-fit: cover;
    }

    .swiper-slide {
      display: block;
    }

    .swiper-slide h2 {
      
    }

    .swiper-slide img {
      /* max-height: 50%; */
      
      
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