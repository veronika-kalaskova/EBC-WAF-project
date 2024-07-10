<template>
  <v-app-bar flat>
    <v-container class="fill-height d-flex align-center justify-space-between container">
      <div class="d-flex align-center">
        <router-link :to="{ name: 'homepage' }">
          <v-img
              src="../assets/globe.svg"
              height="40"
              width="40"
              class="mr-5"
          ></v-img>
        </router-link>
        <router-link :to="{ name: 'homepage' }">
          <v-btn class="text-primary" dark variant="flat">Countries</v-btn>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <div class="search-container">
        <v-text-field
            v-model="searchQuery"
            density="compact"
            class="search-field"
            label="Zde zadejte název země"
            variant="outlined"
            hide-details
            single-line
            rounded
            @keyup.enter="search"
        ></v-text-field>
        <v-text-field
            v-if="showSearch"
            v-model="searchQuery"
            density="compact"
            class="mobile-search"
            label="Zde zadejte název země"
            variant="outlined"
            hide-details
            single-line
            rounded
            @keyup.enter="search"
        ></v-text-field>
        <v-btn icon @click="search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
      <v-spacer></v-spacer>

    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();
const showSearch = ref(false);

const search = () => {

  if (window.innerWidth <= 700) {
    showSearch.value = !showSearch.value;
  }

  if (searchQuery.value.trim()) {
    router.push({ name: 'searchResults', query: { q: searchQuery.value.trim() } });
  }
};

</script>

<style scoped>
.search-field {
  min-width: 400px;
  width: 100%;
}

.search-container {
  display: flex;
  align-items: center;
}

.mobile-search {
  display: none
}

@media screen and (max-width: 700px) {
  .search-field {
    display: none;
  }

  .mobile-search {
    display: block;
    width: 200px;
  }

  :deep(.v-spacer) {
    display: none;
  }
}


@media screen and (max-width: 500px) {
  .mobile-search {
    width: 200px;
  }

  .container {
    justify-content: center !important;
    gap: 1rem;
  }
}
</style>
