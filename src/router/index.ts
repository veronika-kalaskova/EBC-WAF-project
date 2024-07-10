import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Homepage from '@/router/pages/Homepage.vue';
import SearchResults from '@/router/pages/SearchResults.vue';
import FavouriteCountries from '@/router/pages/FavouriteCountries.vue';
import CurrencyFilter from '@/router/pages/CurrencyFilter.vue';
import CountryDetail from "./pages/CountryDetail.vue";

const routes: RouteRecordRaw[] = [
  { path: '/', component: Homepage, name: 'homepage' },
  { path: '/search', name: 'searchResults', component: SearchResults },
  { path: '/favourites', name: 'favourites', component: FavouriteCountries },
  { path: '/currency-filter', name: 'currencyFilter', component: CurrencyFilter },
  {
    path: "/country/:id",
    component: CountryDetail,
    name: "country",
    props: true,
    meta: { requiresAuth: true },
  },
  // { path: "/:pathMatch(.*)*", component: NotFound, name: "notfound" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
