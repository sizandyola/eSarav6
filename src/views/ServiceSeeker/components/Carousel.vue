<template>
    
    <div class="">
      <div class="loading" v-if="loading">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
       <ion-slides v-else>

        <ion-slide v-for="img in photos" :key="img.id">
          <div class="slide" >
            <img :src="'https://storage.googleapis.com/esaragcm.appspot.com/uploads/'+img.url"/>
          
          </div>
        </ion-slide>

    

      </ion-slides>

    </div>
     
    
  

</template>


<script >
import TasksApi from "./../../../api/tasks";

export default  {
  name: 'Tab1',
  data(){
    return{
      photos: [],
      loading: false,
    }
  },
  methods:{
      test(){
          this.$router.push("/account-screen");
      }
  },
  mounted(){
    this.loading = true;
    TasksApi.getBanner().then(data=>{
      
      this.photos = data.data.data;
      this.loading = false;
    }).catch(error=>{
      console.log(error);
      this.loading = false;
    })
  },
}
</script>


<style scoped>
.loading{
  height: 30vh;
}
 ion-slides {
      height: 30vh;
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