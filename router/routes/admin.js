

import AdminIndex from '@/pages/admin/AdminIndex.vue';
import Calls from '@/pages/admin/calls/Calls.vue';
import Users from '@/pages/admin/users/Users.vue';
import ShowUser from '@/pages/admin/users/Show.vue';
import EditUser from '@/pages/admin/users/Edit.vue';
import UserTransactions from '@/pages/admin/users/Transactions.vue';
import UserSummary from '@/pages/admin/users/Summary.vue';
import ApplyAsAdvisorRequests from '@/pages/admin/users/ApplyAsAdvisorRequests.vue';
import ShowAdvisorApplyRequest from '@/pages/admin/users/ShowAdvisorApplyRequest.vue';

import PostCategories from '@/pages/admin/postCategories/Index.vue';
import PostCategoriesList from '@/pages/admin/postCategories/List.vue';
import PostCategoriesEdit from '@/pages/admin/postCategories/Edit.vue';

import Posts from '@/pages/admin/posts/Index.vue';
import PostsList from '@/pages/admin/posts/List.vue';
import PostsEdit from '@/pages/admin/posts/Edit.vue';

import Categories from '@/pages/admin/categories/Categories.vue';
import CategoryEdit from '@/pages/admin/categories/Edit.vue';
import TagsCategories from '@/pages/admin/tags/TagsCategories.vue';

import Advisors from '@/pages/admin/advisors/Advisors.vue';
import ShowAdvisor from '@/pages/admin/advisors/Show.vue';
import EditAdvisor from '@/pages/admin/advisors/Edit.vue';
import AdvisorSchedules from '@/pages/admin/advisors/Schedules.vue';
import AdvisorProfileImage from '@/pages/admin/advisors/ProfileImage.vue';

import Comments from '@/pages/admin/comments/List.vue';

import Options from '@/pages/admin/options/Options.vue';
import SiteOptions from '@/pages/admin/options/SiteOptions.vue';
import TemplateOptions from '@/pages/admin/options/TemplateOptions.vue';
import AffiliateOptions from '@/pages/admin/options/AffiliateOptions.vue';
import WalletOptions from '@/pages/admin/options/WalletOptions.vue';
import SimotelOptions from '@/pages/admin/options/SimotelOptions.vue';
import IntegrationCodes from '@/pages/admin/options/IntegrationCodes.vue';
import MenuBuilder from '@/pages/admin/options/MenuBuilder.vue';
import Elementor from '@/pages/admin/elementor/Elementor.vue';
import Pages from '@/pages/admin/pages/Pages.vue';
import EditPage from '@/pages/admin/pages/EditPage.vue';
import PageElementor from '@/pages/admin/pages/PageELementor.vue';
import DiscountForm from '@/pages/admin/discounts/DiscountForm.vue';
import DiscountsAll from '@/pages/admin/discounts/All.vue';

import CallsAnalyze from '@/pages/admin/reports/CallsAnalyze.vue';
import WordpressSync from '@/pages/admin/options/WordpressSync.vue';




export default [
  //admin -------------------------------------------------------
  {
    path: "/admin",
    name: "admin.index",
    component: AdminIndex,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin'},
  },

  {
    path: "/admin/calls",
    name: "admin.calls",
    component: Calls,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/elementor",
    name: "admin.elementor",
    component: Elementor,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/pages",
    name: "admin.pages",
    component: Pages,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/discounts/create",
    name: "admin.discounts.create",
    component: DiscountForm,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/discounts",
    name: "admin.discounts.all",
    component: DiscountsAll,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/pages/:page_slug/edit",
    name: "admin.pages.edit",
    component: EditPage,
    props: true,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/pages/:page_slug/elementor",
    name: "admin.pages.elementor",
    component: PageElementor,
    props: true,
    meta: { requireAuth: true, level: "admin",layout: 'elementor' },
  },

  {
    path: "/admin/users/list",
    name: "admin.users",
    component: Users,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/users/:user_id?",
    name: "admin.users.show",
    component: ShowUser,
    redirect: {name:'admin.users.show.transactions'},
    props: true,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
    children: [
      { path: 'summary', name: 'admin.users.show.summary', component: UserSummary, },
      { path: 'transactions', name: 'admin.users.show.transactions', component: UserTransactions, },
      { path: 'edit', name: 'admin.users.edit', component: EditUser, },
    ]
  },


  {
    path: "/admin/categories",
    name: "admin.categories",
    component: Categories,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/categories/:category_id",
    name: "admin.categories.edit",
    component: CategoryEdit,
    props: true,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/tags/categories",
    name: "admin.tagsCategories.list",
    component: TagsCategories,
    props: true,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/advisors",
    name: "admin.advisors",
    component: Advisors,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/advisors/:advisor_id",
    name: "admin.advisors.show",
    component: ShowAdvisor,
    props: true,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin'},
  },

  {
    path: "/admin/comments",
    name: "admin.comments.list",
    component: Comments,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin'},
  },

  {
    path: "/admin/advisors/:advisor_id/edit",
    name: "admin.advisors.edit",
    component: EditAdvisor,
    props: true,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin'},
  },

  {
    path: "/admin/advisors/:advisor_id/schedules",
    name: "admin.advisors.schedules",
    component: AdvisorSchedules,
    props: true,
    meta: { requireAuth: true, level: "admin"  ,layout: 'admin'},
  },

  {
    path: "/admin/advisors/:advisor_id/profileImage",
    name: "admin.advisors.profileImage",
    component: AdvisorProfileImage,
    props: true,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/options",
    name: "admin.options",
    component: Options,
    redirect: {name:'admin.options.siteOptions'},
    meta: { requireAuth: true, level: "admin"  ,layout: 'admin'},
    children: [
      { path: 'siteOptions', name: 'admin.options.siteOptions', component: SiteOptions, },
      { path: 'affiliate', name: 'admin.options.affiliate', component: AffiliateOptions, },
      { path: 'wallet', name: 'admin.options.wallet', component: WalletOptions, },
      { path: 'template', name: 'admin.options.template', component: TemplateOptions , },
      { path: 'menuBuilder', name: 'admin.options.mainMenu', redirect: '/admin/options/menuBuilder/mainMenu', },
      { path: 'menuBuilder/:menu', component: MenuBuilder, props: true, },
      { path: 'integrationCodes',name: 'admin.options.integrationCodes', component: IntegrationCodes },
      { path: 'wordpres',name: 'admin.options.wordpress', component: WordpressSync },
      { path: 'simotel',name: 'admin.options.simotel', component: SimotelOptions },
    ]
  },

  {
    path: "/admin/reports",
    name: "admin.reports",
    component: CallsAnalyze,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin'},
    children: [
      { path: 'callsAnalyze', name: 'admin.reports.callsAnalyze', component: CallsAnalyze },
    ]
  },

  {
    path: "/admin/posts/categories",
    name: "admin.posts.categories",
    component: PostCategories,
    redirect: {name:'admin.posts.categories.list'},
    meta: { requireAuth: true, level: "admin" ,layout: 'admin'},
    children: [
      { path: 'list', name:'admin.posts.categories.list', component: PostCategoriesList },
      { path: 'edit/:category_id', name:'admin.posts.categories.edit', component: PostCategoriesEdit, props: true, },
    ]
  },
  
  {
    path: "/admin/posts",
    name: "admin.posts",
    component: Posts,
    redirect: {name:'admin.posts.list'},
    meta: { requireAuth: true, level: "admin"  ,layout: 'admin'},
    children: [
      { path: 'list', name:'admin.posts.list', component: PostsList },
      { path: 'edit/:post_slug', name:'admin.posts.edit', component: PostsEdit, props: true, },
    ]
  },

  {
    path: "/admin/categories/:category_id",
    name: "admin.categories.edit",
    component: CategoryEdit,
    props: true,
    meta: { requireAuth: true, level: "admin"  ,layout: 'admin'},
  },
  {
    path: "/admin/applyAsAdvisorRequests",
    name: "admin.applyAsAdvisorRequests",
    component: ApplyAsAdvisorRequests,
    props: true,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin' },
  },

  {
    path: "/admin/showAdvisorApplyRequest/:user_id",
    name: "admin.showAdvisorApplyRequest",
    component: ShowAdvisorApplyRequest,
    props: true,
    meta: { requireAuth: true, level: "admin" ,layout: 'admin'  },
  },

]