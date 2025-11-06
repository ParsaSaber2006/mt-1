
//marketer
import AffiliatedUsers from '@/pages/marketer/AffiliatedUsers.vue';
import MarketerIndex from '@/pages/marketer/MarketerIndex.vue';

export default [
  //marketers -------------------------------------------------------

  {
    path: "/marketer",
    name: "marketer.index",
    component: MarketerIndex,
    meta: { requireAuth: true, level: "marketer" },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },

  {
    path: "/marketer/afiliatedUsers",
    name: "marketer.affiliatedUsers",
    component: AffiliatedUsers,
    meta: { requireAuth: true, level: "marketer", layout: 'admin' },
    children: [
      // { path: 'base', component: Walleti },
    ]
  },

]