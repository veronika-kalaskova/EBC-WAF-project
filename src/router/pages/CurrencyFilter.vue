<template>
  <div class="currency-filter">
    <div class="intro">
      <h1 class="text-primary header text-h3 font-weight-bold">Vyhledávání podle měny</h1>
    </div>
    <SectionSwitch />

    <v-select
        v-model="selectedCurrency"
        :items="currencyOptions"
        label="Vyberte měnu"
        @change="filterByCurrency" class="input-select"
    ></v-select>

    <div class="cards-section mt-10">
      <div v-if="isLoading" class="loader-container">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else class="cards-wrapper">
        <div v-for="country in uniqueDisplayedCountries" :key="getCountryKey(country)" class="card-item">
          <CountryCard :country="country" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useCountriesStore } from '@/store/countries';
import CountryCard from '@/components/CountryCard.vue';
import Footer from '@/components/Footer.vue';
import { Country } from '@/types/Country';
import SectionSwitch from "@/components/SectionSwitch.vue";

const countriesStore = useCountriesStore();
const selectedCurrency = ref<string | null>(null);
const displayedCountries = ref<Country[]>([]);
const isLoading = ref<boolean>(true);

const filterByCurrency = async () => {
  if (selectedCurrency.value) {
    isLoading.value = true;
    await countriesStore.fetchCountriesByCurrency(selectedCurrency.value);
    displayedCountries.value = countriesStore.filteredCountries;
    isLoading.value = false;
  }
};

const getCountryKey = (country: Country) => {
  return country.name.common || country.name;
};

const uniqueDisplayedCountries = computed(() => {
  const seen = new Set();
  return displayedCountries.value.filter(country => {
    const key = getCountryKey(country);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
});

onMounted(async () => {
  await countriesStore.fetchAllCountries();
  if (countriesStore.currencies.length > 0) {
    selectedCurrency.value = countriesStore.currencies[0];
    await filterByCurrency();
  }
  isLoading.value = false;
});

const currencyOptions = computed<string[]>(() => {
  return countriesStore.currencies;
});

watch(() => selectedCurrency.value, () => {
  if (selectedCurrency.value) {
    filterByCurrency();
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

.currency-filter {
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

.input-select {

  min-width: 10rem;
  margin: 0.5rem;

}
</style>
