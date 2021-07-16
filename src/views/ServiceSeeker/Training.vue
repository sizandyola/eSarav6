<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Training</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="ion-padding">
        <h4>Introduction</h4>
        <p>Interscaff Safety Training Solution Pvt. Ltd. is an international standar various globally recognized trainings provider affiliated with international certification bodies and CTEVT. It is one of the pioneer institutes led by a group of highly experienced, skilled, qualified and competent professionals. <br/><br/> The institute is appropriately customized for the ambitios candidates to be discipline according to the global standard. INTERSCAFF training facility provides wide range courses for aspirants who wants to be trained and certified in international standards.
        </p>

        <div class="" style="background:#f69d1d; color:#fff; padding: 10px">
          <p>Mission</p>
          
          Providing employable skill and knowledge to economically active youths of Nepal.
        </div>
        <div class="" style="background:#4cab46; color:#fff; padding: 10px">
          <p>Vision</p>
          
          Develop skills, explore oppurtunities
        </div>


          <table class="table">
            <tr>
              <td>Sector</td>
              <td>Trade</td>
            </tr>
            <tr>
              <td>Construction</td>
              <td>Scaffolding, Mason, Plumber, Steel Fixer, Welder, Aluminium Fabricator, S. Carpenter, Painter, Electrician, Mechanical Helper, Gypsum, Carpenter, Tile Mason etc.</td>
            </tr>
            <tr>
              <td>CIRS Scaffolding</td>
              <td>Level 1, Level2, Basic Scaffolding Inspector Supervisor</td>
            </tr>
            <tr>
              <td>IRATA Rope Access</td>
              <td>Level 1, Level 2, Level 3</td>
            </tr>
            <tr>
              <td>Language Training</td>
              <td>English, Japanese N5, N4, N3 Korean 1,2 </td>
            </tr>
            <tr>
              <td>Key Training</td>
              <td>Interview preparation, Accounting, Enterpreneur, Development, Post Training Services, Moticational Counselings, Refresher Training</td>
            </tr>
            <tr>
              <td>IT Training</td>
              <td>Basic, MS office package, Computer Operator</td>
            </tr>
            <tr>
              <td>Other Training</td>
              <td>Cleaner, Gardener, Landscapping, Driving, Rooftop gardening training, Day care services for small child holder parents etc.</td>
            </tr>
            <tr>
              <td>Oil & Gas Training</td>
              <td>Spray Painter, Pipe Fitter, Sand Blasting</td>
            </tr>
            </table>
    


 

       

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  {
  name: 'Tab3',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>


<style scoped>
td{
  background: #283890;
  padding: 5px;
  color:#fff;
}
</style>