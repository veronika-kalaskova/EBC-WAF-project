<template>
  <v-card
      class="mx-auto pa-6 rounded-xl elevation-0 card"
      color="cardBackground"
  >
    <v-row class="d-flex justify-space-between pa-3 align-center">
      <v-card-title class="text-h5 font-weight-bold text-primary">
        {{ getCountryName(country) }}
      </v-card-title>
      <img v-if="country.href && country.href.flag" class="img" :src="country.href.flag" />
    </v-row>

    <v-card-text>
      <ul class="text-primary font-weight-bold">
        <div class="d-flex align-center mb-3" v-if="country.continent">
          <img src="../assets/continent.svg" class="mr-4" alt="" />
          <li>{{ country.continent }}</li>
        </div>

        <div class="d-flex align-center mb-3" v-if="country.population">
          <img src="../assets/people.svg" class="mr-4" alt="" />
          <li>{{ country.population }}</li>
        </div>
        <div class="d-flex align-center mb-3" v-if="country.currency">
          <img src="../assets/currency.svg" class="mr-4" alt="" />
          <li>{{ country.currency }}</li>
        </div>
      </ul>
    </v-card-text>
    <div class="d-flex justify-space-between align-center">
      <v-card-actions>
        <v-btn icon @click="toggleFavorite">
          <v-icon :color="isFavorite ? 'yellow' : ''">mdi-star</v-icon>
        </v-btn>
      </v-card-actions>
      <router-link :to="{ name: 'country', params: { id: getCountryName(country) } }"><v-btn class="detail-btn">Detail planety</v-btn></router-link>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useCountriesStore } from '@/store/countries';
import { Country } from '@/types/Country';

const props = defineProps<{ country: Country }>();
const countriesStore = useCountriesStore();

const getCountryName = (country: Country) => {
  if (typeof country.name === 'object' && country.name.common) {
    return country.name.common;
  }
  return country.name;
};

const toggleFavorite = () => {
  if (props.country) {
    countriesStore.toggleFavorite(props.country);
  }
};

const isFavorite = computed(() => {
  return countriesStore.isFavorite(props.country);
});
</script>

<style scoped>
li {
  list-style: none;
}

.img {
  border-radius: 10px;
  margin-right: 2rem;
  height: 40px;
}

.card {
  width: 400px;
  height: 395px;
}

.detail-btn {
  background-color: var(--primary);
  color: white;
}

@media screen and (max-width: 400px) {
  .card {
    transform: scale(0.85)
  }
}
</style>
