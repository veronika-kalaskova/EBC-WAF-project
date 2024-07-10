<template>
  <div class="search-results">
    <div class="intro">
      <h1 class="text-primary header text-h3 font-weight-bold">Oblíbené země</h1>
    </div>

    <SectionSwitch />

    <div class="cards-section mt-10">
      <div v-if="countriesStore.isLoading" class="loader-container">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else>
        <div v-if="uniqueFavoriteCountries.length === 0" class="no-favorites">
          Dosud žádné uložené země 🥲
        </div>
        <div v-else class="cards-wrapper">
          <div v-for="country in uniqueFavoriteCountries" :key="typeof country.name === 'object' ? country.name.common : country.name" class="card-item">
            <CountryCard :country="country" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useCountriesStore } from '@/store/countries';
import CountryCard from '@/components/CountryCard.vue';
import { Country } from "@/types/Country";
import SectionSwitch from "@/components/SectionSwitch.vue";

const countriesStore = useCountriesStore();
const favoriteCountries = ref<Country[]>([]);

onMounted(() => {
  favoriteCountries.value = countriesStore.loadFavorites();
});

watch(() => countriesStore.favoriteCountries, (newValue) => {
  favoriteCountries.value = newValue;
});

const uniqueFavoriteCountries = computed(() => {
  const seen = new Set();
  return favoriteCountries.value.filter(country => {
    const key = typeof country.name === 'object' ? country.name.common : country.name;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
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

.no-favorites {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh; /* Adjust height as needed */
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: var(--primary);
}
</style>
