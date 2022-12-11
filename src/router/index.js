import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';
import Social from '../pages/Social.vue';
import Brand from '../pages/Brand.vue';
import Discount from '../pages/Discount.vue';
import Category from '../pages/Category.vue';
import CarList from '../pages/CarList.vue';
import DailySellReport from '../pages/DailySellReport.vue';
import Media from '../pages/Media.vue';
import Snackbar from '../pages/Snackbar.vue';
import Chart from '../pages/Chart.vue';
import Mailbox from '../pages/Mailbox.vue';
import Calendar from '../pages/Calendar.vue';
import Login from '../pages/core/Login.vue';
import Error from '../pages/core/Error.vue';



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        breadcrumb: [
          { name: 'dashboard' }
        ]
      }
    },
    {
      path: '/mailbox',
      name: 'Mailbox',
      component: Mailbox,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'mailbox' }
        ]
      }
    },
    {
      path: '/snackbar',
      name: 'Snackbar',
      component: Snackbar,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'snackbar' }
        ]
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'calendar' }
        ]
      }
    },
    {
      path: '/social',
      name: 'Social',
      component: Social,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'social' }
        ]
      }
    },
    {
      path: '/media',
      name: 'Media',
      component: Media,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'media' }
        ]
      }
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'charts' }
        ]
      }
    },

    {
      path: '/brand',
      name: 'Brand',
      component: Brand,
      meta: {
        breadcrumb: [
          { name: 'Setups' },
          { name: 'brand' }
        ]
      }
    },

    {
      path: '/category',
      name: 'Category',
      component: Category,
      meta: {
        breadcrumb: [
          { name: 'Setups' },
          { name: 'category' }
        ]
      }
    },

    {
      path: '/discount',
      name: 'Discount',
      component: Discount,
      meta: {
        breadcrumb: [
          { name: 'Setups' },
          { name: 'discount' }
        ]
      }
    },

    {
      path: '/car',
      name: 'Car',
      component: CarList,
      meta: {
        breadcrumb: [
          { name: 'Setups' },
          { name: 'car' }
        ]
      }
    },

    {
      path: '/daily-sell-report',
      name: 'DailySellReport',
      component: DailySellReport,
      meta: {
        breadcrumb: [
          { name: 'Reports' },
          { name: 'Daily Sell Report' }
        ]
      }
    },


    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      meta: {
        allowAnonymous: true
      }
    },
  ]
});
