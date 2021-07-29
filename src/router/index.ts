import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import ServiceSeeker from "./../views/ServiceSeeker/Index.vue";
import IntroScreen from "./../views/IntroScreen.vue";
import AccountScreen from "./../views/AccountScreen.vue";
import Signup from "./../views/Auth/Signup.vue";
import Signin from "./../views/Auth/Signin.vue";
import ForgotPassword from "./../views/Auth/ForgotPassword.vue";
import Tabs from '../views/Tabs.vue'


import Tradesmen from "./../views/Tradesmen/Index.vue";


import { Storage } from "@ionic/storage";
let localStorage =new Storage()
localStorage.create();


/* @ts-ignore */
async function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
let esaraUser = await localStorage.get('esaraUser');
let introScreenShown = await localStorage.get('introScreenShown');

if(esaraUser)
  isAuthenticated = true;
 else
  isAuthenticated= false;

 if(isAuthenticated) 
 {
   
  next(); // allow to enter route
 } 
 else
 {
   if(introScreenShown){
    next('/account-screen'); // go to '/login';
   }else{
    next('/intro-screen');
   }
  
 }
}

/* @ts-ignore */
async function initialGuardMyroute(to, from, next)
{
  {
    var isAuthenticated= false;
   let esaraUser = await localStorage.get('esaraUser');
   let introScreenShown = await localStorage.get('introScreenShown');
   
   if(esaraUser)
     isAuthenticated = true;
    else
     isAuthenticated= false;
   
    if(isAuthenticated) 
    {
      let loginAs = await localStorage.get('loginAs');
      if(loginAs=="0"){
        next("/service-seeker/tab1");
      }else{
        next("/tradesmen/tab1");
      }
    //  next(); // allow to enter route
    } 
    else
    {
      if(introScreenShown){
       next('/account-screen'); // go to '/login';
      }else{
       next('/intro-screen');
      }
     
    }
}
}





const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // redirect: "/service-seeker/tab1",
    component: AccountScreen,
    beforeEnter: initialGuardMyroute,
  },
  {
    path: '/account-screen',
    component: AccountScreen,
    
  },
  {
    path: '/intro-screen',
    component: IntroScreen,
    
  },
  {
    path: '/sign-up',
    component: Signup,
    
  },
  {
    path: '/sign-in',
    component: Signin,
    
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    
  },
  {
    path: '/service-seeker/',
    component: ServiceSeeker,
    beforeEnter: guardMyroute,
    children: [
      {
        path: '',
        redirect: '/service-seeker/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/ServiceSeeker/Home.vue'),
      },
      {
        path: 'tab2',
        component: () => import('@/views/ServiceSeeker/MyOrders.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/ServiceSeeker/Training.vue')
      },
      {
        path: 'tab4',
        component: () => import('@/views/ServiceSeeker/Profile.vue')
      },
      {
        path: 'tab5',
        component: () => import('@/views/ServiceSeeker/Financials.vue')
      }
    ]
  },
  {
    path: '/tradesmen/',
    component: Tradesmen,
    beforeEnter: guardMyroute,
    children: [
      {
        path: '',
        redirect: '/tradesmen/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tradesmen/Home.vue'),
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tradesmen/Tasks.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tradesmen/Trainings.vue')
      },
      {
        path: 'tab4',
        component: () => import('@/views/Tradesmen/Attendance.vue')
      },
      {
        path: 'tab5',
        component: () => import('@/views/ServiceSeeker/Profile.vue')
      }
    ]
  },
  {
    path: '/service-details',
    name: "serviceDetails",
    component: () => import('@/views/ServiceSeeker/ServiceDetails.vue'),
    props: true,
    beforeEnter: guardMyroute,
  },
  {
    path: '/service-details/:id',
    name: "bookService",
    component: () => import('@/views/ServiceSeeker/BookService.vue'),
    props: true,
    beforeEnter: guardMyroute,
  },
  {
    path: '/order-details/:id',
    name: "orderDetails",
    component: () => import('@/views/ServiceSeeker/OrderDetails.vue'),
    props: true,
    beforeEnter: guardMyroute,
  },
  {
    path: '/task-details/:id',
    name: "taskDetails",
    component: () => import('@/views/Tradesmen/TaskDetails.vue'),
    props: true,
    beforeEnter: guardMyroute,
  },
  {
    path: '/training-details',
    name: "trainingDetails",
    component: () => import('@/views/Tradesmen/TrainingDetails.vue'),
    props: true,
    beforeEnter: guardMyroute,
  },
  {
    path: '/profile',
    name: "Profile",
    component: () => import('@/views/Profile/Profile.vue'),
    beforeEnter: guardMyroute,

  },
  {
    path: '/notifications',
    name: "Notifications",
    component: () => import('@/views/ServiceSeeker/Notifications.vue'),
    beforeEnter: guardMyroute,

  },
  {
    path: '/documents',
    name: "Documents",
    component: () => import('@/views/Profile/Documents.vue'),
    beforeEnter: guardMyroute,

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
