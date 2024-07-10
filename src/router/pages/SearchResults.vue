<template>
  <div class="search-results">
    <div class="intro">
      <h1 class="text-primary header text-h3 font-weight-bold">Výsledky hledání</h1>
    </div>

    <div class="cards-section mt-10">
      <div v-if="countriesStore.isLoading" class="loader-container">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else>
        <div v-if="countriesStore.searchResults.length === 0" class="no-results">
          Bohužel jsme nic nenalezli 🥲
        </div>
        <div v-else class="cards-wrapper">
          <div v-for="country in countriesStore.searchResults" :key="country.name.common || country.name" class="card-item">
            <CountryCard :country="country" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCountriesStore } from '@/store/countries';
import CountryCard from '@/components/CountryCard.vue';

const countriesStore = useCountriesStore();
const route = useRoute();

const performSearch = async (query: string) => {
  countriesStore.isLoading = true;
  await countriesStore.searchCountries(query);
  countriesStore.isLoading = false;
};

onMounted(() => {
  const query = route.query.q as string;
  if (query) {
    performSearch(query);
  }
});

watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    performSearch(newQuery as string);
  }
});
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Reduced height to move loader up */
  width: 100%;
}

.search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
}

.header {
  margin-bottom: 2rem;
}

.cards-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.card-item {
  flex: 1 1 calc(33.333% - 1rem);
  box-sizing: border-box;
  max-width: 400px;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: var(--primary);
}
</style>
