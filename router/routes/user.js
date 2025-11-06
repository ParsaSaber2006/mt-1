

//user
import Wallet from '@/pages/user/wallet/Wallet.vue';
import Collaborate from '@/pages/user/collaborate/Collaborate.vue';
import Profile from '@/pages/user/Profile.vue';
import UserCalls from '@/pages/user/calls/UserCalls.vue';
import UserArea from '@/pages/user/UserArea.vue';
import ApplyAsAdvisor from '@/pages/user/ApplyAsAdvisor.vue';


export default [
 
  {
    path: "/wallet/:status?",
    name: "wallet",
    props: true,
    component: Wallet,
    meta: { requireAuth: true, layout: 'admin'},
    children: [
      // { path: 'base', component: Walleti },
    ]
  },
  {
    path: "/collaborate/",
    name: "collaborate",
    component: Collaborate,
    meta: { requireAuth: true, layout: 'admin'  },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },

  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requireAuth: true ,layout: 'admin' },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },


  {
    path: "/history",
    name: "history",
    component: UserCalls,
    meta: { requireAuth: true ,layout: 'admin' },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },
  {
    path: "/userarea",
    name: "userarea",
    component: UserArea,
    meta: { requireAuth: true, layout: 'admin' },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },


  {
    path: "/applyAsAdvisor",
    name: "applyAsAdvisor",
    component: ApplyAsAdvisor,
    meta: { },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },


]