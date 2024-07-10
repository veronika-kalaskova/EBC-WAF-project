<template>
  <div>
    <div v-if="isLoading" class="loader-container">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <div class="intro d-flex">
        <h1 class="text-primary mr-4 header text-h3 font-weight-bold">
          {{ getCountryName(selectedCountry) }}
        </h1>
        <img class="img" :src="selectedCountry?.href.flag" />
      </div>
      <div class="card-section-flex mt-10">
        <v-card class="pa-6 rounded-xl elevation-0 card" color="cardBackground">
          <v-card-text>
            <ul class="text-primary font-weight-bold d-flex flex-column ga-3">
              <div class="d-flex align-center">
                <v-icon class="mr-2 lower-opacity">mdi-domain</v-icon>
                <li class="lower-opacity"><span class="highlight">{{ selectedCountry?.full_name }}</span></li>
              </div>
              <div class="d-flex align-center">
                <v-icon class="mr-2 lower-opacity">mdi-earth</v-icon>
                <li class="lower-opacity"><span class="highlight">{{ selectedCountry?.continent }}</span></li>
              </div>
              <div class="d-flex align-center">
                <v-icon class="mr-2 lower-opacity">mdi-account-group</v-icon>
                <li class="lower-opacity"><span class="highlight">{{ selectedCountry?.population }}</span></li>
              </div>
            </ul>
          </v-card-text>
        </v-card>

        <v-card class="pa-6 rounded-xl elevation-0 card" color="cardBackground">
          <v-card-text>
            <ul class="text-primary font-weight-bold d-flex flex-column ga-3">
              <div class="d-flex align-center">
                <v-icon class="mr-2 lower-opacity">mdi-city</v-icon>
                <li class="lower-opacity"><span class="highlight">{{ selectedCountry?.capital }}</span></li>
              </div>
              <div class="d-flex align-center">
                <v-icon class="mr-2 lower-opacity">mdi-ruler</v-icon>
                <li class="lower-opacity"><span class="highlight">{{ selectedCountry?.size }}</span></li>
              </div>
              <div class="d-flex align-center">
                <v-icon class="mr-2 lower-opacity">mdi-currency-usd</v-icon>
                <li class="lower-opacity"><span class="highlight">{{ selectedCountry?.currency }}</span></li>
              </div>
            </ul>
          </v-card-text>
        </v-card>
      </div>

      <v-card class="pa-6 ma-10 rounded-xl elevation-0 card-continent">
        <h1 class="text-primary">Další státy v tomto kontinentu</h1>

        <v-card-text>
          <ul
              class="text-primary font-weight-bold d-flex flex-row justify-space-between ga-5 align-center flex-sm-wrap listContinents"
          >
            <router-link
                v-for="c in selectedContinents"
                :key="getCountryName(c)"
                :to="{ name: 'country', params: { id: getCountryName(c) } }"
                class="continent-link"
            >
              <li class="continent">{{ getCountryName(c) }}</li>
            </router-link>
          </ul>
        </v-card-text>
      </v-card>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useCountriesStore } from "@/store/countries";
import Footer from "@/components/Footer.vue";
import { Country } from "@/types/Country";
import { useRoute, useRouter } from "vue-router";

const countriesStore = useCountriesStore();

const selectedCountry = ref<Country | null>(null);
const route = useRoute();
const router = useRouter();
const countryId = ref<string>("");
const isLoading = ref<boolean>(true);

const currentContinent = ref("");
const selectedContinents = ref<Country[]>([]);

const getCountryName = (country: Country | null) => {
  if (!country) return "";
  if (typeof country.name === "object" && country.name.common) {
    return country.name.common;
  }
  return country.name;
};

const fetchCountryDetail = async (id: string) => {
  isLoading.value = true;
  await countriesStore.searchCountryDetail(id);
  selectedCountry.value = countriesStore.countryDetail[0] || null;
  fetchCountries();
  isLoading.value = false;
};

const fetchCountries = () => {
  if (selectedCountry.value) {
    currentContinent.value = selectedCountry.value.continent;
    countriesStore.fetchCountriesSimilarToContinent(currentContinent.value).then(() => {
      selectedContinents.value = countriesStore.countriesSimilarToContinent.slice(0, 7);
    });
  }
};

onMounted(async () => {
  await countriesStore.fetchAllCountries();
  countryId.value = route.params.id.toString();
  await fetchCountryDetail(countryId.value);
});

watch(
    () => route.params.id,
    async (newId) => {
      countryId.value = newId.toString();
      await fetchCountryDetail(countryId.value);
    }
);
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

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
  height: 150px;
  display: flex;
  align-items: center;
}

.detail-btn {
  background-color: var(--primary);
  color: white;
}

.card-section-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card-continent {
  background-color: rgb(220, 223, 220);
  margin-top: 1rem;
}

.continent {
  background-color: #edeeed;
  color: var(--primary);
  border-radius: 18px;
  padding: 0.5rem 2rem;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 4px 6px rgba(175, 173, 173, 0.5);
  transition: all .2s ease-out;
}

.continent:hover {
  background-color: #344e41;
  color: white;
}

.lower-opacity {
  opacity: 1;
}

.highlight {
  opacity: 0.8;
  font-weight: bold;
}

.continent-link {
  text-decoration: none;
}

@media screen and (max-width: 600px) {
  .listContinents {
    flex-direction: column !important;
  }

  h1 {
    font-size: 36px !important;
    padding: 0rem !important;
  }
}

@media screen and (max-width: 400px) {
  .card {
    transform: scale(0.85);
  }
}

.img {
  border-radius: 10px;
  margin-right: 2rem;
  height: 40px;
}
</style>
