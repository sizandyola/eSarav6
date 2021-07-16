<template>
  <ion-app>
    <!-- <button style="position:absolute;top:0;z-index:9999999" @click="testEvent">Test Event</button> -->
    <ion-router-outlet />
  </ion-app>
</template>

<script >
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { FCM } from "@capacitor-community/fcm";
import { PushNotifications } from "@capacitor/push-notifications";
import localStorage from "./mixins/localStorage";
import TasksApi from "./api/tasks";

export default defineComponent({
  name: "App",
  mixins: [localStorage],
  data() {
    return {
      fcm: FCM,
    };
  },
  methods: {
    testEvent() {
      this.emitter.emit("refreshApi");
    },
    initialize() {
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermission().then((result) => {});
      // Add registration error if there are.
      PushNotifications.addListener("registrationError", (error) => {
        console.log(`error on register ${JSON.stringify(error)}`);
      }),
        // Add Notification received
        PushNotifications.addListener(
          "pushNotificationReceived",
          (notification) => {
            this.emitter.emit("refreshApi");
            console.log(`notification ${JSON.stringify(notification)}`);
          }
        ),
        // Add Action performed
        PushNotifications.addListener(
          "pushNotificationActionPerformed",
          async (notification) => {
            this.emitter.emit("refreshApi");
            console.log("notification succeeded");
          }
        ),
        // Initialize the registration with FCM Token
        PushNotifications.register();
      FCM.getToken()
        .then((r) => {
          // this.saveToken(r.token);
        })
        .catch((err) => console.log(err));
    },
    async saveToken(token) {
      let currentUser = await this.localStorage.get("esaraUser");

      if (currentUser) {
        TasksApi.editProfile(
          { notification_token: token },
          currentUser.profile.id
        )
          .then((data) => {})
          .catch((error) => {
            console.log("ERROR SETTING TOKEN", error);
          });
      }
    },
  },
  created() {
    // this.fcm = new FCM();
  },

  mounted() {
    this.initialize();
  },
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>