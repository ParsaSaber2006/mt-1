
//advisor
import AdvisorIndex from '@/pages/advisor/AdvisorIndex.vue';
import AdvisorCalls from '@/pages/advisor/calls/Calls.vue';
import MissedCalls from '@/pages/advisor/calls/MissedCalls.vue';
import AdvisorCallRequests from '@/pages/advisor/calls/CallRequests.vue';
import MyContacts from '@/pages/advisor/contacts/MyContacts.vue';
import MySchedule from '@/pages/advisor/schedules/MySchedule.vue';


export default [
  //advisor -------------------------------------------------------

  {
    path: "/advisor",
    name: "advisor.index",
    component: AdvisorIndex,
    meta: { requireAuth: true, level: "advisor", layout: 'admin'  },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },

  {
    path: "/advisor/calls",
    name: "advisor.calls",
    component: AdvisorCalls,
    meta: { requireAuth: true, level: "advisor", layout: 'admin'  },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },
  
  {
    path: "/advisor/schedules",
    name: "advisor.schedules",
    component: MySchedule,
    meta: { requireAuth: true, level: "advisor", layout: 'admin'  },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },
  
  {
    path: "/advisor/missedCalls",
    name: "advisor.missedCalls",
    component: MissedCalls,
    meta: { requireAuth: true, level: "advisor", layout: 'admin'  },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },
  {
    path: "/advisor/callRequests",
    name: "advisor.callRequests",
    component: AdvisorCallRequests,
    meta: { requireAuth: true, level: "advisor", layout: 'admin'  },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },
  {
    path: "/advisor/myContacts",
    name: "advisor.myContacts",
    component: MyContacts,
    meta: { requireAuth: true, level: "advisor", layout: 'admin'  },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },
]