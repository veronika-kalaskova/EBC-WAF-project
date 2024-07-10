<template>
  <v-app>
    <div class="app-container">
      <Navbar />
      <v-main class="main-content">
        <router-view />
      </v-main>
      <Footer />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCountriesStore } from "@/store/countries";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const countriesStore = useCountriesStore();

onMounted(() => {
  if (!countriesStore.allCountries.length) {
    countriesStore.fetchAllCountries();
  }
});
</script>

<style>
:root {
  --primary: #344E41;
  --background: #F1F1F1;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
