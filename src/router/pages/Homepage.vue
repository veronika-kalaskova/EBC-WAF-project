<template>
  <div class="homepage" @scroll="onScroll" ref="homepageRef">
    <div class="intro">
      <div class="intro-text">
        <h1 class="text-primary header text-h3 font-weight-bold">Objevte s námi nové země</h1>
        <div>
          <v-btn
              color="primary"
              class="rounded-xl custom-primary"
              append-icon="mdi-arrow-right"
              @click="scrollToSection"
          >Prozkoumat</v-btn>
        </div>
      </div>
      <v-img class="ilustration" max-width="369" src="@/assets/illustration.svg" />
    </div>

    <div id="tips-section" class="countries-section">
      <SectionSwitch />
    </div>

    <h1 class="text-primary text-h3 font-weight-bold pa-7">Naše tipy</h1>

    <div class="cards-section">
      <div v-for="country in displayedCountries" :key="country.name">
        <CountryCard :country="country" />
      </div>
      <div v-if="countriesStore.isLoading" class="loader-container">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCountriesStore } from '@/store/countries';
import CountryCard from '@/components/CountryCard.vue';
import SectionSwitch from '@/components/SectionSwitch.vue';
import { useRouter } from 'vue-router';
import { Country } from '@/types/Country';

const countriesStore = useCountriesStore();
const router = useRouter();
const homepageRef = ref(null);
const displayedCountries = ref<Country[]>([]);
const itemsPerPage = 9;

const loadMoreCountries = async () => {
  if (countriesStore.isLoading || displayedCountries.value.length >= countriesStore.totalCountries) return;
  const nextPage = countriesStore.currentPage + 1;
  await countriesStore.fetchHomepageCountries(nextPage, itemsPerPage);
  displayedCountries.value = countriesStore.homepageCountries;
};

const onScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMoreCountries();
  }
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
  countriesStore.fetchHomepageCountries(1, itemsPerPage).then(() => {
    displayedCountries.value = countriesStore.homepageCountries;
  });
});

const navigateToCurrencyFilter = () => {
  router.push({ name: 'currencyFilter' });
};

const navigateToFavorites = () => {
  router.push({ name: 'favourites' });
};

const scrollToSection = () => {
  const section = document.getElementById('tips-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
}

.header {
  max-width: 413px;
  margin-bottom: 3rem;
}

.intro-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-right: 27rem;
}

.countries-section {
  margin-top: 1rem;
}

.cards-section {
  width: 100%;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

@media screen and (max-width: 1100px) {
  .ilustration {
    display: none;
  }

  .intro {
    display: block;
  }

  .intro-text {
    margin-right: 0px;
  }
}

@media screen and (max-width: 600px) {
  .switch ul {
    flex-direction: column;
    padding: 1rem 3rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 36px !important;
    padding: 0rem !important;
  }
}
</style>
